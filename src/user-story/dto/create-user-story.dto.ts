import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserStoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  subject: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  projectId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  statusSlug: string;
}
