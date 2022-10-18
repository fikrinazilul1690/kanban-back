import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CreateUserStoryDto {
  @ApiProperty()
  subject: string;

  @ApiProperty()
  description: string;

  @ApiHideProperty()
  @Exclude()
  order: number;

  @ApiProperty()
  projectId: number;

  @ApiProperty()
  statusSlug: string;
}
