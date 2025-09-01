import { Injectable } from "@nestjs/common";
import { ExchangeType, QueueType } from "module-queue/types";
import { QueueService } from "module-queue";

@Injectable()
export class SetupService {
  constructor() { }

  async run(queueService: QueueService) {
    const exchange = 'exc.delay';
    const queue = process.env.RMQ_QUEUE_EMAIL || 'q-email';
    const route = process.env.RMQ_QUEUE_EMAIL || 'r-email';

    console.log('[nodemailer] Configuring queue service...');

    await queueService.assertExchange(exchange, ExchangeType.xDelayedMessage, {
      autoDelete: false,
      durable: true,
      passive: true,
      arguments: {
        'x-delayed-type': 'direct',
      }
    });

    await queueService.assertQueue(queue, {
      durable: true,
      arguments: {
        'x-queue-type': QueueType.classic
      }
    })

    await queueService.bindQueueToExchange(exchange, queue, route)

    console.log('[nodemailer] Queue service configured')
  }
}