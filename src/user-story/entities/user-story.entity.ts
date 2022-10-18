import { ApiProperty } from '@nestjs/swagger';
import { UserStory } from '@prisma/client';

export class UserStoryEntity implements UserStory {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  projectId: number;

  @ApiProperty()
  statusId: number;
}
