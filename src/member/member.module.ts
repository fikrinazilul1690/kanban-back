import { MemberMiddleware } from '../common/middlewares/member.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';

@Module({
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MemberMiddleware).forRoutes('/v1/members/:memberId');
  }
}
