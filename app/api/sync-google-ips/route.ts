import { NextResponse } from 'next/server';
import dns from 'dns/promises';
import nodemailer from 'nodemailer';
import createSesTransport from 'nodemailer-ses-transport';

// --- Nodemailer/AWS SES Email Sending Config ---
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;
const SES_FROM_EMAIL_ADDRESS = process.env.SES_FROM_EMAIL_ADDRESS || '"Moons Out IP Sync Agent" <status@moonsoutmedia.com>';
const STATUS_EMAIL_RECIPIENT = process.env.STATUS_EMAIL_RECIPIENT; // Your email address for status updates

// Nodemailer transporter using SES transport
let statusEmailTransporter: nodemailer.Transporter | null = null;

if (AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY && AWS_REGION && SES_FROM_EMAIL_ADDRESS && STATUS_EMAIL_RECIPIENT) {
  console.log('[SYNC_GOOGLE_IPS] Creating transporter with nodemailer-ses-transport');
  
  // Create transporter with dedicated SES transport plugin
  statusEmailTransporter = nodemailer.createTransport(createSesTransport({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  } as any)); // Cast to any to silence TypeScript issues with the nodemailer-ses-transport types
}

async function sendStatusEmail(subject: string, textBody: string, htmlBody?: string) {
  if (!statusEmailTransporter) {
    console.warn('Status email transporter not configured. Missing AWS env vars or recipient. Skipping status email.');
    return;
  }

  try {
    await statusEmailTransporter.sendMail({
      from: SES_FROM_EMAIL_ADDRESS,
      to: STATUS_EMAIL_RECIPIENT!,
      subject: subject,
      text: textBody,
      html: htmlBody || `<pre>${textBody.replace(/\n/g, '<br>')}</pre>`,
    });
    console.log(`Status email sent successfully to ${STATUS_EMAIL_RECIPIENT}`);
  } catch (emailError: any) {
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

export async function GET(request: Request) { 
  let statusSubject = 'Moons Out Media: Google SPF IP Report (nodemailer-ses-transport)';
  let statusTextBody = `Run at: ${new Date().toUTCString()}\n\n`;

  if (!statusEmailTransporter) {
     statusTextBody = 'Configuration Error: Email transporter not configured. Missing AWS env vars or recipient.';
     console.error(statusTextBody);
     return NextResponse.json({ error: statusTextBody }, { status: 500 });
  }

  try {
    statusTextBody += 'Fetching Google SPF IPs...\n';
    const googleIps = await getGoogleSpfIps();
    if (googleIps.length === 0) {
      statusTextBody += 'IP Sync Information: No Google SPF IPs found or DNS resolution failed.\n';
      console.warn(statusTextBody);
      statusSubject = `INFO: ${statusSubject} - No IPs Found`;
      await sendStatusEmail(statusSubject, statusTextBody);
      return NextResponse.json({ message: statusTextBody, totalGoogleIpsFound: 0 });
    }
    statusTextBody += `Found ${googleIps.length} unique Google IP ranges:\n${googleIps.join('\n')}\n`;
    
    statusSubject = `SUCCESS: ${statusSubject}`;
    await sendStatusEmail(statusSubject, statusTextBody);
    return NextResponse.json({
      message: `Successfully fetched Google SPF IPs. Report sent. Total IPs: ${googleIps.length}`,
      totalGoogleIpsFound: googleIps.length,
      googleIps: googleIps,
    });

  } catch (error: any) {
    statusSubject = `CRITICAL ERROR: ${statusSubject}`;
    statusTextBody += `Error in /api/sync-google-ips (nodemailer-ses-transport): ${(error as Error).message}\n\n${(error as Error).stack}`;
    console.error(statusTextBody);
    await sendStatusEmail(statusSubject, statusTextBody);
    return NextResponse.json({ error: 'Internal server error while fetching Google SPF IPs (nodemailer-ses-transport).', details: (error as Error).message }, { status: 500 });
  }
} 