import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateUserStoryDto } from './create-user-story.dto';

export class UpdateUserStoryDto extends PartialType(
  OmitType(CreateUserStoryDto, ['projectId'] as const),
) {}
