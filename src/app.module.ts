import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { QueueService } from "module-queue";
import { EmailService } from "./services/email.service";
import { MainService } from "./services/main.service";
import { SetupService } from "./services/setup.service";

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [EmailService, MainService, SetupService, QueueService]
})
export class AppModule { }