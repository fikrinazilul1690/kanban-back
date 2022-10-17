import { ApiProperty } from '@nestjs/swagger';
import { Member, Role } from '@prisma/client';

export class MemberEntity implements Member {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  roleId: number;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  projectId: number;

  @ApiProperty()
  isOwner: boolean;

  @ApiProperty()
  assignedAt: Date;
}
