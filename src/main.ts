import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { QueueService } from 'module-queue';
import { AppModule } from './app.module';

require('dotenv').config({
  path: ".env." + (process.env.ENVIRONMENT || "dev")
})

const queueService = new QueueService()

async function bootstrap() {
  await queueService.start();

  console.log('ENVIRONMENT: ' + process.env.ENVIRONMENT);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);

  console.log('---------------------');
  console.log('EMAIL SERVICE RUNNING');
  console.log('---------------------');
}
bootstrap();

export { queueService }
