import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import type { NextRequest } from 'next/server'

// Define the expected shape of the form data
interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  findUs?: string
  message: string
  service: string[]
  branch?: 'media' | 'labs' | 'both' | 'unsure'
  selectionType?: 'unsure' | 'both' | 'media' | 'labs' | 'services' // Helps determine recipient
}

// Environment variables (ensure these are set in your .env.local or Vercel environment)
const EMAIL_HOST = process.env.EMAIL_HOST
const EMAIL_PORT = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS
const NODEMAILER_FROM_EMAIL = process.env.NODEMAILER_FROM_EMAIL || '"Moons Out Media Contact Form" <noreply@moonsoutmedia.com>'
const BRANDON_EMAIL = process.env.BRANDON_EMAIL || 'brandon@moonsoutmedia.com'
const LEVI_EMAIL = process.env.LEVI_EMAIL || 'levi@moonsoutmedia.com'
const TEAM_EMAIL = process.env.TEAM_EMAIL || 'team@moonsoutmedia.com'


function getRecipientEmail(formData: ContactFormData): string {
  const { branch, selectionType, service } = formData

  if (selectionType === 'unsure' || branch === 'unsure') {
    return TEAM_EMAIL
  }
  if (selectionType === 'both' || branch === 'both') {
    return TEAM_EMAIL
  }
  if (selectionType === 'labs' || branch === 'labs') {
    return BRANDON_EMAIL
  }
  if (selectionType === 'media' || branch === 'media') {
    return LEVI_EMAIL
  }

  // Fallback for 'services' type or if branch/selectionType is ambiguous
  // Check services if selectionType is 'services' or branch is not set
  const hasMediaService = service.some(s => s.startsWith('Moons Out Media:'))
  const hasLabsService = service.some(s => s.startsWith('Moons Out Labs:'))

  if (hasMediaService && hasLabsService) {
    return TEAM_EMAIL
  }
  if (hasMediaService) {
    return LEVI_EMAIL
  }
  if (hasLabsService) {
    return BRANDON_EMAIL
  }
  
  // Default to team email if no specific service branch can be identified
  return TEAM_EMAIL
}

export async function POST(request: NextRequest) {
  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
    console.error('Email server environment variables are not configured.')
    return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 })
  }

  try {
    const formData = await request.json() as ContactFormData

    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json({ message: 'Missing required fields: name, email, and message.' }, { status: 400 })
    }
    
    const recipientEmail = getRecipientEmail(formData)

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: EMAIL_PORT === 465, // true for 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })

    const subject = `New Contact Form Submission: ${formData.name}`
    
    const servicesText = formData.service.length > 0 ? formData.service.join(', ') : 'Not specified'
    const branchText = formData.branch ? `Branch: ${formData.branch}` : 'Branch: Not specified'
    const selectionTypeText = formData.selectionType ? `Selection Type: ${formData.selectionType}` : 'Selection Type: Not specified'

    const textContent = `
      You have a new contact form submission:

      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone || 'Not provided'}
      Company: ${formData.company || 'Not provided'}
      How did you find us?: ${formData.findUs || 'Not provided'}
      
      Service Interest:
      ${selectionTypeText}
      ${branchText}
      Services Selected: ${servicesText}

      Message:
      ${formData.message}
    `

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            h2 { color: #555; }
            strong { color: #000; }
            .field-group { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-left: 5px; }
            .message-box { padding: 10px; background-color: #f9f9f9; border: 1px solid #eee; border-radius: 3px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>New Contact Form Submission</h2>
            <div class="field-group">
              <span class="label">Name:</span><span class="value">${formData.name}</span>
            </div>
            <div class="field-group">
              <span class="label">Email:</span><span class="value">${formData.email}</span>
            </div>
            ${formData.phone ? `<div class="field-group"><span class="label">Phone:</span><span class="value">${formData.phone}</span></div>` : ''}
            ${formData.company ? `<div class="field-group"><span class="label">Company:</span><span class="value">${formData.company}</span></div>` : ''}
            ${formData.findUs ? `<div class="field-group"><span class="label">How did you find us?:</span><span class="value">${formData.findUs}</span></div>` : ''}
            
            <h3>Service Interest</h3>
            <div class="field-group">
              <span class="label">Selection Type:</span><span class="value">${formData.selectionType || 'Not specified'}</span>
            </div>
            <div class="field-group">
              <span class="label">Branch Focus:</span><span class="value">${formData.branch || 'Not specified'}</span>
            </div>
            <div class="field-group">
              <span class="label">Services Selected:</span><span class="value">${formData.service.length > 0 ? formData.service.join(', ') : 'None'}</span>
            </div>

            <h3>Message</h3>
            <div class="message-box">
              <p>${formData.message.replace(/\\n/g, '<br>')}</p>
            </div>
          </div>
        </body>
      </html>
    `

    await transporter.sendMail({
      from: NODEMAILER_FROM_EMAIL,
      to: recipientEmail,
      replyTo: formData.email,
      subject: subject,
      text: textContent,
      html: htmlContent,
    })

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 })

  } catch (error) {
    console.error('Error sending email:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ message: `Failed to send message: ${errorMessage}` }, { status: 500 })
  }
} 