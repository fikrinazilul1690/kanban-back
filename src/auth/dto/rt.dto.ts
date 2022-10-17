import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsJWT, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty()
  @IsJWT()
  @IsNotEmpty()
  @IsDefined()
  rt: string;
}
