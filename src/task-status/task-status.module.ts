import { TaskStatusMiddleware } from './../common/middlewares/task-status.middleware';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TaskStatusService } from './task-status.service';
import { TaskStatusController } from './task-status.controller';

@Module({
  controllers: [TaskStatusController],
  providers: [TaskStatusService],
})
export class TaskStatusModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TaskStatusMiddleware)
      .forRoutes('/v1/task-statuses/:taskStatusId');
  }
}
