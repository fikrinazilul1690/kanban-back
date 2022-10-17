import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class MemberMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { memberId } = req.params;
    const member = await this.prisma.member.findUnique({
      where: { id: +memberId },
    });
    console.log('middleware');
    res.cookie('currentProject', member.projectId);
    next();
  }
}
