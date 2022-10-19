import { RefreshTokenDto } from './dto/rt.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  PickType,
} from '@nestjs/swagger';
import { Auth } from './entities/auth.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Public } from 'src/common/decorators/public.decorator';
import { Patch } from '@nestjs/common/decorators';

@Controller({ version: ['1'], path: 'auth' })
@ApiTags('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Auth })
  async login(@Body() loginDto: LoginDto): Promise<Auth> {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  @ApiCreatedResponse({ type: UserEntity })
  async register(@Body() registerDTO: RegisterDto): Promise<UserEntity> {
    const user = await this.authService.register(registerDTO);
    return new UserEntity(user);
  }

  @Post('refresh')
  @ApiCreatedResponse({ type: PickType(Auth, ['accessToken'] as const) })
  refreshAccessToken(
    @Body() payload: RefreshTokenDto,
  ): Promise<Pick<Auth, 'accessToken'>> {
    return this.authService.refreshAccessToken(payload.rt);
  }

  @Patch('revoke')
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  revoke(@Body() payload: RefreshTokenDto) {
    return this.authService.revoke(payload.rt);
  }
}
