import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsDefined,
  MinLength,
  IsString,
  IsBoolean,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateTaskStatusDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @IsDefined()
  projectId: number;

  @ApiProperty()
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isClosed?: boolean;

  @ApiProperty()
  @Matches(RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$'), {
    message: 'color hex not valid',
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  colorHex: string;
}
