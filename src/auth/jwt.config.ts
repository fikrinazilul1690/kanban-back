import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '10s' },
};

export const refreshTokenConfig: JwtSignOptions = {
  secret: process.env.RT_SECRET,
  expiresIn: '1d',
};
