import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  ValidationArguments,
} from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

const message = (args: ValidationArguments): string => {
  const qMessage: Array<any> = [];
  if (!args.value?.match(/(?=.*?[A-Z])/)) {
    qMessage.push('upper case letter');
  }
  if (!args.value?.match(/(?=.*?[a-z])/)) {
    qMessage.push('lower case letter');
  }
  if (!args.value?.match(/(?=.*?[0-9])/)) {
    qMessage.push('digit');
  }
  if (!args.value?.match(/(?=.*?[#?!@$%^&*-])/)) {
    qMessage.push('special character');
  }
  return `password must contain(s) one or more ${qMessage.join(', ')}`;
};

export class RegisterDto {
  @ApiProperty()
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  firstName: string;

  @ApiProperty()
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @ApiProperty()
  @Matches(RegExp('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])'), {
    message,
  })
  @MinLength(8)
  @IsNotEmpty()
  @IsDefined()
  password: string;

  @ApiProperty()
  @Match('password', { message: 'must match with password field' })
  @IsNotEmpty()
  @IsDefined()
  confirmPassword: string;
}
