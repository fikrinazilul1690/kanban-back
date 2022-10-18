import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Member, Role, RoleType } from '@prisma/client';
import { Type } from 'class-transformer';

export class MemberEntity implements Member {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  roleId: number;

  @ApiHideProperty()
  role: Role;

  @ApiProperty()
  projectId: number;

  @ApiProperty()
  isOwner: boolean;

  @Type(() => Date)
  @ApiProperty()
  assignedAt: Date;

  constructor(partial: Partial<MemberEntity>) {
    Object.assign(this, partial);
  }
}

// export class RoleEntity implements Role {
//   @ApiProperty()
//   id: number;

//   @ApiProperty()
//   type: RoleType;
//   createdAt: Date;
//   updatedAt: Date;
// }
