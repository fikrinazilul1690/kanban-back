import { RefreshTokenDto } from './dto/rt.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from './entities/auth.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Public } from 'src/common/decorators/public.decorator';

@Controller({ version: ['1'], path: 'auth' })
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Auth })
  async login(@Body() loginDto: LoginDto): Promise<Auth> {
    return await this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  @ApiCreatedResponse({ type: UserEntity })
  async register(@Body() registerDTO: RegisterDto): Promise<UserEntity> {
    const user = await this.authService.register(registerDTO);
    return new UserEntity(user);
  }

  @Public()
  @Post('revoke')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  revoke(@Body() payload: RefreshTokenDto) {
    return this.authService.revoke(payload.rt);
  }

  @Public()
  @Post('refresh')
  refreshAccessToken(@Body() payload: RefreshTokenDto) {
    return this.authService.refreshAccessToken(payload.rt);
  }
}
