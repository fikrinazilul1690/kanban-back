import { ApiProperty } from '@nestjs/swagger';
import { UsStatus } from '@prisma/client';

export class UsStatusEntity implements UsStatus {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  isClosed: boolean;

  @ApiProperty()
  projectId: number;

  @ApiProperty()
  colorHex: string;

  constructor(partial: Partial<UsStatusEntity>) {
    Object.assign(this, partial);
  }
}
