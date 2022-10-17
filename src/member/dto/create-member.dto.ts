import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
export class CreateMemberDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @ApiProperty({ enum: RoleType })
  @IsEnum(RoleType)
  @IsNotEmpty()
  @IsDefined()
  role: RoleType;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  projectId: number;
}
