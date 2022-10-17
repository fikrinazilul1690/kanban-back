import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class MemberMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: () => void) {
    const { memberId } = req.params;
    const member = await this.prisma.member.findUnique({
      where: { id: +memberId },
    });
    console.log('middleware');
    // res.cookie('currentProject', member.projectId);
    next();
  }
}
