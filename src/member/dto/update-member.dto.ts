import { PickType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';

export class UpdateMemberDto extends PickType(CreateMemberDto, [
  'role',
] as const) {}
