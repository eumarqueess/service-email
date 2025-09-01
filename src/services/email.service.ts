import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { Injectable } from "@nestjs/common";
import { EmailType } from "../types";

@Injectable()
export class EmailService {
  constructor() { }

  async send(message: EmailType) {
    try {
      console.log('[nodemailer] Sending email...');

      const transport = nodemailer.createTransport({
        host: process.env.MAIL_SERVICE,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD
        }
      } as SMTPTransport.Options);

      const mailOptions = {
        from: process.env.MAIL_FROM,
        to: message.to,
        subject: message.subject,
        html: message.body
      };

      await transport.sendMail(mailOptions);
      console.log('[nodemailer] Email sent');
    } catch (error: any) {
      throw new Error('[nodemailer] Error sending email:', error.message);
    }
  }
}