import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import createSesTransport from 'nodemailer-ses-transport';

// Environment variables for Nodemailer/AWS SES Email Sending
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;
const SES_FROM_EMAIL_ADDRESS = process.env.SES_FROM_EMAIL_ADDRESS || '"Moons Out Test Email Agent" <test@moonsoutmedia.com>';
const TEST_EMAIL_RECIPIENT = process.env.STATUS_EMAIL_RECIPIENT;

// Nodemailer transporter using SES transport
let testEmailTransporter: nodemailer.Transporter | null = null;

if (AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY && AWS_REGION && SES_FROM_EMAIL_ADDRESS && TEST_EMAIL_RECIPIENT) {
  console.log('[TEST_EMAIL_ROUTE] Creating transporter with nodemailer-ses-transport');
  
  // Create transporter with dedicated SES transport plugin
  testEmailTransporter = nodemailer.createTransport(createSesTransport({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  } as any)); // Cast to any to silence TypeScript issues with the nodemailer-ses-transport types
}

export async function GET(request: Request) {
  const timestamp = new Date().toUTCString();
  console.log(`Test email cron job triggered at: ${timestamp}`);

  if (!testEmailTransporter) {
    const errorMessage = 'Test email transporter not configured. Missing environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, SES_FROM_EMAIL_ADDRESS, STATUS_EMAIL_RECIPIENT).';
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }

  if (!TEST_EMAIL_RECIPIENT) {
    const errorMessage = 'TEST_EMAIL_RECIPIENT (STATUS_EMAIL_RECIPIENT) is not set. Cannot send test email.';
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
  
  const subject = `Test Email from Moons Out Media (SES Transport) @ ${timestamp}`;
  const textContent = `This is a test email sent from the Vercel cron job at ${timestamp}. If you received this, Nodemailer with nodemailer-ses-transport is configured correctly.`;
  const htmlContent = `<p>This is a test email sent from the Vercel cron job at <strong>${timestamp}</strong>.</p><p>If you received this, Nodemailer with nodemailer-ses-transport is configured correctly.</p>`;

  try {
    await testEmailTransporter.sendMail({
      from: SES_FROM_EMAIL_ADDRESS,
      to: TEST_EMAIL_RECIPIENT,
      subject: subject,
      text: textContent,
      html: htmlContent,
    });
    console.log(`Test email successfully sent to ${TEST_EMAIL_RECIPIENT} at ${timestamp}`);
    return NextResponse.json({ message: `Test email successfully sent to ${TEST_EMAIL_RECIPIENT}` });
  } catch (error: any) {
    console.error('Failed to send test email:', error);
    return NextResponse.json({ 
      error: 'Failed to send test email.', 
      details: {
        message: error.message,
        code: error.code,
        ...(error.response && { response: error.response }),
        ...(error.command && { command: error.command }),
      }
    }, { status: 500 });
  }
} 