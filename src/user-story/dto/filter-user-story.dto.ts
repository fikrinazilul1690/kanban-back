import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterUserStoryDto {
  @ApiPropertyOptional()
  projectId: number;

  @ApiPropertyOptional()
  statusSlug: string;
}
