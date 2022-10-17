import { ProjectDefaultModule } from './../project-default/project-default.module';
import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [ProjectDefaultModule],
})
export class ProjectModule {}
