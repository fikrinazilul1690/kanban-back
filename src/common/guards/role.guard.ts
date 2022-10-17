import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || isPublic) {
      return true;
    }

    const { user, body, params, cookies } = context.switchToHttp().getRequest();
    const projectId =
      +body.projectId || +params.projectId || +cookies.currentProject;

    const member = this.prisma.member.findMany({
      where: {
        projectId,
        role: {
          type: {
            in: user.role,
          },
        },
      },
    });

    if (user && member) {
      return true;
    }

    return false;
  }
}
