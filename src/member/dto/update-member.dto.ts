import { PickType, PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';

export class UpdateMemberDto extends PartialType(
  PickType(CreateMemberDto, ['role'] as const),
) {}
