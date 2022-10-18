import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUsStatusDto } from './create-us-status.dto';

export class UpdateUsStatusDto extends PartialType(
  OmitType(CreateUsStatusDto, ['projectId'] as const),
) {}
