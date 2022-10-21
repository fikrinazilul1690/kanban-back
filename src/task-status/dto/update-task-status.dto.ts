import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTaskStatusDto } from './create-task-status.dto';

export class UpdateTaskStatusDto extends PartialType(
  OmitType(CreateTaskStatusDto, ['projectId'] as const),
) {}
