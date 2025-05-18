import { NextResponse } from 'next/server';
import dns from 'dns/promises';
import nodemailer from 'nodemailer';

// --- SendGrid IP Management ---
const SENDGRID_API_KEY_IP_MANAGEMENT = process.env.SENDGRID_API_KEY_IP_MANAGEMENT;
const SENDGRID_WHITELIST_URL = 'https://api.sendgrid.com/v3/access_settings/whitelist';

// --- Nodemailer/SendGrid Email Sending Config (from your contact form setup) ---
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587;
const EMAIL_USER = process.env.EMAIL_USER; // Should be "apikey" for SendGrid
const EMAIL_PASS = process.env.EMAIL_PASS; // Should be your main SendGrid API Key (for sending email)
const NODEMAILER_FROM_EMAIL = process.env.NODEMAILER_FROM_EMAIL || '"Moons Out IP Sync Agent" <status@moonsoutmedia.com>';
const STATUS_EMAIL_RECIPIENT = process.env.STATUS_EMAIL_RECIPIENT; // Your email address for status updates

// Nodemailer transporter for sending status emails
let statusEmailTransporter: nodemailer.Transporter | null = null;
if (EMAIL_HOST && EMAIL_USER && EMAIL_PASS && STATUS_EMAIL_RECIPIENT) {
  statusEmailTransporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
}

async function sendStatusEmail(subject: string, textBody: string, htmlBody?: string) {
  if (!statusEmailTransporter) {
    console.warn('Status email transporter not configured. Skipping status email.');
    return;
  }
  if (!STATUS_EMAIL_RECIPIENT) {
    console.warn('STATUS_EMAIL_RECIPIENT not set. Skipping status email.');
    return;
  }

  try {
    await statusEmailTransporter.sendMail({
      from: NODEMAILER_FROM_EMAIL,
      to: STATUS_EMAIL_RECIPIENT,
      subject: subject,
      text: textBody,
      html: htmlBody || `<pre>${textBody.replace(/\n/g, '<br>')}</pre>`, // Basic HTML formatting for newlines
    });
    console.log(`Status email sent successfully to ${STATUS_EMAIL_RECIPIENT}`);
  } catch (emailError) {
    console.error('Failed to send status email:', emailError);
  }
}

async function fetchDnsTxtRecords(domain: string): Promise<string[]> {
  try {
    const records = await dns.resolveTxt(domain);
    return records.flat();
  } catch (error) {
    console.warn(`Could not resolve TXT records for ${domain}:`, (error as Error).message);
    return [];
  }
}

async function getGoogleSpfIps(): Promise<string[]> {
  const initialSpfDomain = '_spf.google.com';
  let domainsToQuery = [initialSpfDomain];
  const processedDomains = new Set<string>();
  const ipRanges = new Set<string>();

  while (domainsToQuery.length > 0) {
    const domain = domainsToQuery.pop()!;
    if (processedDomains.has(domain)) {
      continue;
    }
    processedDomains.add(domain);
    const txtRecords = await fetchDnsTxtRecords(domain);

    for (const record of txtRecords) {
      const parts = record.split(' ');
      for (const part of parts) {
        if (part.startsWith('include:')) {
          const includeDomain = part.substring('include:'.length);
          if (!processedDomains.has(includeDomain)) {
            domainsToQuery.push(includeDomain);
          }
        } else if (part.startsWith('ip4:')) {
          ipRanges.add(part.substring('ip4:'.length));
        } // Add ip6 logic here if needed
      }
    }
  }
  return Array.from(ipRanges);
}

async function getCurrentSendGridWhitelist(): Promise<string[]> {
  if (!SENDGRID_API_KEY_IP_MANAGEMENT) {
    console.error('SENDGRID_API_KEY_IP_MANAGEMENT is not set for getting whitelist.');
    return [];
  }
  try {
    const response = await fetch(SENDGRID_WHITELIST_URL, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${SENDGRID_API_KEY_IP_MANAGEMENT}` },
    });
    if (!response.ok) {
      console.error(`Error fetching SendGrid whitelist: ${response.status}`, await response.text());
      return [];
    }
    const data = await response.json();
    return data.result?.map((item: { ip: string }) => item.ip) || [];
  } catch (error) {
    console.error('Failed to fetch SendGrid whitelist:', error);
    return [];
  }
}

async function addToSendGridWhitelist(ipsToAdd: string[]): Promise<{success: boolean, addedCount?: number, errors?: any[]}> {
  if (!SENDGRID_API_KEY_IP_MANAGEMENT || ipsToAdd.length === 0) {
    return { success: false, errors: [{message: "API key not set or no IPs to add"}] };
  }
  const payload = { ips: ipsToAdd.map(ip => ({ ip })) };
  try {
    const response = await fetch(SENDGRID_WHITELIST_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY_IP_MANAGEMENT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const responseBody = await response.json();
    if (!response.ok) {
      console.error(`Error adding to SendGrid whitelist: ${response.status}`, responseBody);
      return { success: false, errors: responseBody.errors || [{message: `Status ${response.status}`}] };
    }
    // SendGrid POST to /whitelist returns the added rules, so result.length is the count.
    return { success: true, addedCount: responseBody.result?.length || ipsToAdd.length }; 
  } catch (error) {
    console.error('Failed to add to SendGrid whitelist:', error);
    return { success: false, errors: [{message: (error as Error).message}] };
  }
}

export async function GET(request: Request) { 
  let statusSubject = 'Moons Out Media: SendGrid IP Sync Status';
  let statusTextBody = `Run at: ${new Date().toUTCString()}\n\n`;

  if (!SENDGRID_API_KEY_IP_MANAGEMENT) {
    statusTextBody += 'Configuration Error: SENDGRID_API_KEY_IP_MANAGEMENT is not set.';
    console.error(statusTextBody);
    await sendStatusEmail(`ERROR: ${statusSubject}`, statusTextBody);
    return NextResponse.json({ error: statusTextBody }, { status: 500 });
  }
  if (!statusEmailTransporter) {
     statusTextBody = 'Configuration Error: Email transporter for status updates is not configured (missing one or more of: EMAIL_HOST, EMAIL_USER, EMAIL_PASS, STATUS_EMAIL_RECIPIENT).';
     console.error(statusTextBody);
     // Cannot send email if transporter itself failed, but we can log and return error for the cron job
     return NextResponse.json({ error: statusTextBody }, { status: 500 });
  }

  try {
    statusTextBody += 'Fetching Google SPF IPs...\n';
    const googleIps = await getGoogleSpfIps();
    if (googleIps.length === 0) {
      statusTextBody += 'IP Sync Failed: No Google SPF IPs found or DNS resolution failed.';
      console.error(statusTextBody);
      await sendStatusEmail(`ERROR: ${statusSubject}`, statusTextBody);
      return NextResponse.json({ message: statusTextBody }, { status: 500 });
    }
    statusTextBody += `Found ${googleIps.length} unique Google IP ranges.\n`;

    statusTextBody += 'Fetching current SendGrid whitelist...\n';
    const currentSendGridIps = await getCurrentSendGridWhitelist();
    statusTextBody += `SendGrid currently has ${currentSendGridIps.length} whitelisted IPs.\n`;

    const ipsToAdd = googleIps.filter(ip => !currentSendGridIps.includes(ip));

    if (ipsToAdd.length > 0) {
      statusTextBody += `Attempting to add ${ipsToAdd.length} new Google IP(s) to SendGrid whitelist...\nIPs: ${ipsToAdd.join(', ')}\n`;
      const addResult = await addToSendGridWhitelist(ipsToAdd);
      if (addResult.success) {
        statusSubject = `SUCCESS: ${statusSubject}`;
        statusTextBody += `Successfully added ${addResult.addedCount || ipsToAdd.length} IP(s) to SendGrid.`;
        await sendStatusEmail(statusSubject, statusTextBody);
        return NextResponse.json({
          message: `Successfully fetched and processed Google IPs. Added ${addResult.addedCount || ipsToAdd.length} new IP(s).`,
          totalGoogleIpsFound: googleIps.length,
          ipsAdded: ipsToAdd,
        });
      } else {
        statusSubject = `ERROR: ${statusSubject}`;
        statusTextBody += `Failed to add IPs to SendGrid whitelist. Errors: ${JSON.stringify(addResult.errors || 'Unknown error')}`;
        console.error(statusTextBody);
        await sendStatusEmail(statusSubject, statusTextBody);
        return NextResponse.json({ error: 'Failed to add IPs to SendGrid whitelist.', details: addResult.errors }, { status: 500 });
      }
    } else {
      statusSubject = `INFO: ${statusSubject}`;
      statusTextBody += 'Google IPs already up-to-date in SendGrid whitelist. No changes made.';
      await sendStatusEmail(statusSubject, statusTextBody);
      return NextResponse.json({
        message: 'Google IPs already up-to-date in SendGrid whitelist.',
        totalGoogleIpsFound: googleIps.length,
      });
    }

  } catch (error) {
    statusSubject = `CRITICAL ERROR: ${statusSubject}`;
    statusTextBody += `Error in /api/sync-google-ips: ${(error as Error).message}\n\n${(error as Error).stack}`;
    console.error(statusTextBody);
    await sendStatusEmail(statusSubject, statusTextBody);
    return NextResponse.json({ error: 'Internal server error while syncing IPs.', details: (error as Error).message }, { status: 500 });
  }
} 