import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
import createSesTransport from 'nodemailer-ses-transport'

// Environment variables
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const AWS_REGION = process.env.AWS_REGION
const SES_FROM_EMAIL_ADDRESS = process.env.SES_FROM_EMAIL_ADDRESS || '"Moons Out Media" <noreply@moonsoutmedia.com>'
const BRANDON_EMAIL = process.env.BRANDON_EMAIL || 'brandon@moonsoutmedia.com'
const LEVI_EMAIL = process.env.LEVI_EMAIL || 'levi@moonsoutmedia.com'
const TEAM_EMAIL = process.env.TEAM_EMAIL || 'team@moonsoutmedia.com'

// Initialize nodemailer SES transporter
let scheduleTransporter: nodemailer.Transporter | null = null
if (AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY && AWS_REGION) {
  scheduleTransporter = nodemailer.createTransport(createSesTransport({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  } as any))
}

interface ScheduleData {
  name: string
  email: string
  phone?: string
  company?: string
  role?: string
  path: 'media' | 'labs' | 'both' | ''
  found?: string
  appointmentType: 'discovery' | 'audit' | ''
  goal?: string
}

function getRecipient(path: ScheduleData['path']) {
  if (path === 'both') return TEAM_EMAIL
  if (path === 'media') return LEVI_EMAIL
  if (path === 'labs') return BRANDON_EMAIL
  return TEAM_EMAIL
}

export async function POST(request: NextRequest) {
  if (!scheduleTransporter) {
    console.error('SES transporter not configured')
    return NextResponse.json({ message: 'Server error: email transport not configured' }, { status: 500 })
  }
  try {
    const data = (await request.json()) as ScheduleData
    if (!data.name || !data.email || !data.path || !data.appointmentType) {
      return NextResponse.json({ message: 'Missing required scheduling fields' }, { status: 400 })
    }
    const to = getRecipient(data.path)
    const subject = `New Booking Request: ${data.name}`
    const text = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nCompany: ${data.company || 'N/A'}\nRole: ${data.role || 'N/A'}\nPath: ${data.path}\nFound via: ${data.found || 'N/A'}\nAppointment: ${data.appointmentType}\nGoal: ${data.goal || 'N/A'}`
    await scheduleTransporter.sendMail({
      from: SES_FROM_EMAIL_ADDRESS,
      to,
      replyTo: data.email,
      subject,
      text,
    })
    return NextResponse.json({ message: 'Schedule request sent' })
  } catch (err) {
    console.error('Error sending schedule email:', err)
    return NextResponse.json({ message: 'Failed to send schedule email' }, { status: 500 })
  }
} 