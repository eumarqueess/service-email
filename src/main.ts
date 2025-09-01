import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { QueueService } from 'module-queue';
import { AppModule } from './app.module';
import { SetupService } from './services/setup.service';

require('dotenv').config({
  path: ".env." + (process.env.ENVIRONMENT || "dev")
})

const queueService = new QueueService()
const setupService = new SetupService()

async function bootstrap() {
  await queueService.start();
  await setupService.run(queueService);

  console.log('ENVIRONMENT: ' + process.env.ENVIRONMENT);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);

  console.log('---------------------');
  console.log('EMAIL SERVICE RUNNING');
  console.log('---------------------');
}
bootstrap();

export { queueService }
