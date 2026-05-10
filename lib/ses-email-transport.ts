import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
import nodemailer from 'nodemailer'

interface SesEmailTransportConfig {
  accessKeyId: string
  secretAccessKey: string
  region: string
}

export function createSesEmailTransport({
  accessKeyId,
  secretAccessKey,
  region,
}: SesEmailTransportConfig): nodemailer.Transporter {
  const sesClient = new SESv2Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })

  return nodemailer.createTransport({
    SES: {
      sesClient,
      SendEmailCommand,
    },
  } as any)
}
