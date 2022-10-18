import { PrismaService } from 'src/prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Auth } from './entities/auth.entity';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { refreshTokenConfig } from './jwt.config';
import { TokenExpiredError } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async hashData(data: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
  }

  async register(registerDto: RegisterDto) {
    const { email, password, lastName, firstName } = registerDto;
    const hashedPassword = await this.hashData(password);
    const user = await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
      include: {
        members: { include: { role: true } },
      },
    });

    return user;
  }

  async login(loginDto: LoginDto): Promise<Auth> {
    const { email, password } = loginDto;
    const user = await this.validateEmail(email);

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Wrong email or password');
    }

    if (user && passwordValid) {
      const randomId = uuidv4();
      const hashedRt = await this.hashData(randomId);
      await this.updateRt(user.id, hashedRt);

      const refreshToken = await this.jwtService.signAsync(
        { sub: user.id, email: user.email, refreshToken: randomId },
        refreshTokenConfig,
      );

      const accessToken = await this.getToken({
        id: user.id,
        email: user.email,
      });

      return {
        accessToken,
        refreshToken,
      };
    }
  }

  async revoke(rt: string) {
    const payload: { sub: string; email: string; refreshToken: string } =
      await this.decodeToken(rt, refreshTokenConfig);

    const user = await this.validateUser(payload.sub);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: null,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
    };
  }

  async refreshAccessToken(rt: string) {
    const payload: { sub: string; email: string; refreshToken: string } =
      await this.decodeToken(rt, refreshTokenConfig);

    const validUser = await this.validateUser(payload.sub);

    if (!validUser || !validUser.refreshToken)
      throw new ForbiddenException('Access Denied');

    const validRt = await bcrypt.compare(
      payload.refreshToken,
      validUser.refreshToken,
    );

    if (!validRt) throw new ForbiddenException('Access Denied');

    const accessToken = await this.getToken({
      id: payload.sub,
      email: payload.email,
    });

    return { accessToken };
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new ForbiddenException('Not valid user!');
    }

    return user;
  }

  async validateEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }

    return user;
  }

  async getToken(
    payload: Pick<UserEntity, 'id' | 'email'>,
    options?: JwtSignOptions,
  ) {
    const jwtPayload = {
      sub: payload.id,
      email: payload.email,
    };

    return await this.jwtService.signAsync(jwtPayload, options);
  }

  async updateRt(id: string, refreshToken: string) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });
  }

  async decodeToken(token: string, options: JwtSignOptions): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, options);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token is expired');
      }

      if (!token) {
        throw new UnauthorizedException();
      }
      throw new InternalServerErrorException('Failed to decode token');
    }
  }
}
