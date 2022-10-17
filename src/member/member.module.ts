import { MemberMiddleware } from './member.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { RequestMethod } from '@nestjs/common/enums';

@Module({
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MemberMiddleware).forRoutes({
      path: 'members',
      method: RequestMethod.DELETE,
    });
  }
}
