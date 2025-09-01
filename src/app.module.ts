import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { QueueService } from "module-queue";
import { EmailService } from "./services/email.service";
import { MainService } from "./services/main.service";

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [EmailService, MainService, QueueService]
})
export class AppModule { }