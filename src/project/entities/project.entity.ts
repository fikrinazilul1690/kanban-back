import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@prisma/client';

export class ProjectEntity implements Project {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  owner: string;
}
