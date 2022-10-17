import { MemberEntity } from './../../member/entities/member.entity';
import { ApiProperty } from '@nestjs/swagger';
import { RoleType, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { Expose } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @ApiProperty()
  email: string;

  @Exclude()
  members: MemberEntity[];

  @ApiProperty({ example: [RoleType.OWNER], enum: RoleType, isArray: true })
  @Expose()
  get roles(): Array<RoleType> {
    const role = this.members.map((data) => data?.role.type);

    const uniqueRole = [...new Set(role)];

    return uniqueRole;
  }

  @Exclude()
  password: string;

  @Exclude()
  refreshToken: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
