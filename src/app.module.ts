import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';
import { MemberModule } from './member/member.module';
import { ProjectModule } from './project/project.module';
import { ProjectDefaultModule } from './project-default/project-default.module';
import { UsStatusModule } from './us-status/us-status.module';
import { UserStoryModule } from './user-story/user-story.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    TestModule,
    UserModule,
    MemberModule,
    ProjectModule,
    ProjectDefaultModule,
    UsStatusModule,
    UserStoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
