import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsStatusService } from './us-status.service';
import { UsStatusController } from './us-status.controller';
import { UsStatusMiddleware } from 'src/common/middlewares/us-status.middleware';

@Module({
  controllers: [UsStatusController],
  providers: [UsStatusService],
})
export class UsStatusModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsStatusMiddleware)
      .forRoutes('/v1/userstory-statuses/:usStatusId');
  }
}
