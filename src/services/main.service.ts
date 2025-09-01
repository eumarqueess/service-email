import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { EmailService } from "./email.service";
import { EmailType } from "../types";
import { queueService } from "../main";

@Injectable()
export class MainService {
  constructor(private emailService: EmailService) { }

  @Cron('*/10 * * * * *')
  async run() {
    const queue = process.env.RMQ_QUEUE_EMAIL || 'q-email';

    try {
      console.log(`[nodemailer] Consuming queue ${queue}...`);

      await queueService.consumeQueue(queue, async message => {
        try {
          const content = JSON.parse(message.content.toString()) as EmailType;
          await this.emailService.send(content);
          await queueService.ack(message);
        } catch (error: any) {
          console.error('[nodemailer] Error:', error.message);
          await queueService.nack(message);
        }
      });

      console.log(`[nodemailer] Queue ${queue} consumed`);
    } catch (error: any) {
      console.log('[nodemailer] Error consuming queue:', error.message);
    }
  }
}
