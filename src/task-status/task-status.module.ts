import { Module } from '@nestjs/common';
import { TaskStatusService } from './task-status.service';
import { TaskStatusController } from './task-status.controller';

@Module({
  controllers: [TaskStatusController],
  providers: [TaskStatusService]
})
export class TaskStatusModule {}
