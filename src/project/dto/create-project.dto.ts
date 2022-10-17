import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
