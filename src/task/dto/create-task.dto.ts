import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  IsDefined,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  projectId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  usId: number;

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
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  statusSlug?: string;
}
