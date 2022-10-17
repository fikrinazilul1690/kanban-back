import { Module } from '@nestjs/common';
import { ProjectDefaultService } from './project-default.service';

@Module({
  providers: [ProjectDefaultService],
  exports: [ProjectDefaultService],
})
export class ProjectDefaultModule {}
