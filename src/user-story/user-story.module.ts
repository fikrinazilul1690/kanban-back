import { UserStoryMiddleware } from './../common/middlewares/user-story.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserStoryService } from './user-story.service';
import { UserStoryController } from './user-story.controller';

@Module({
  controllers: [UserStoryController],
  providers: [UserStoryService],
})
export class UserStoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserStoryMiddleware).forRoutes('/v1/userstories/:usId');
  }
}
