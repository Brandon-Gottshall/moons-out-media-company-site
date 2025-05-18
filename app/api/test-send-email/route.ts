import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Environment variables for Nodemailer/SendGrid Email Sending
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587;
const EMAIL_USER = process.env.EMAIL_USER; // Should be "apikey" for SendGrid
const EMAIL_PASS = process.env.EMAIL_PASS; // Should be your main SendGrid API Key (for sending email)
const NODEMAILER_FROM_EMAIL = process.env.NODEMAILER_FROM_EMAIL || '"Moons Out Test Email Agent" <test@moonsoutmedia.com>';
const TEST_EMAIL_RECIPIENT = process.env.STATUS_EMAIL_RECIPIENT; // Send test to the same recipient as status updates for now

// Nodemailer transporter
let testEmailTransporter: nodemailer.Transporter | null = null;
if (EMAIL_HOST && EMAIL_USER && EMAIL_PASS && TEST_EMAIL_RECIPIENT && NODEMAILER_FROM_EMAIL) {
  testEmailTransporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465, // true for 465, false for other ports
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
}

export async function GET(request: Request) {
  const timestamp = new Date().toUTCString();
  console.log(`Test email cron job triggered at: ${timestamp}`);

  if (!testEmailTransporter) {
    const errorMessage = 'Test email transporter not configured. Missing one or more environment variables (EMAIL_HOST, EMAIL_USER, EMAIL_PASS, STATUS_EMAIL_RECIPIENT, NODEMAILER_FROM_EMAIL).';
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }

  if (!TEST_EMAIL_RECIPIENT) {
    const errorMessage = 'TEST_EMAIL_RECIPIENT (STATUS_EMAIL_RECIPIENT) is not set. Cannot send test email.';
    console.error(errorMessage);
    // No need to try sending email if recipient is missing.
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
  
  const subject = `Test Email from Moons Out Media @ ${timestamp}`;
  const textContent = `This is a test email sent from the Vercel cron job at ${timestamp}. If you received this, Nodemailer and SendGrid email sending (via API key) is configured correctly.`;
  const htmlContent = `<p>This is a test email sent from the Vercel cron job at <strong>${timestamp}</strong>.</p><p>If you received this, Nodemailer and SendGrid email sending (via API key) is configured correctly.</p>`;

  try {
    await testEmailTransporter.sendMail({
      from: NODEMAILER_FROM_EMAIL,
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
        response: error.response,
        command: error.command,
      }
    }, { status: 500 });
  }
} 