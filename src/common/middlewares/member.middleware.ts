import { MemberService } from './../../member/member.service';
import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class MemberMiddleware implements NestMiddleware {
  constructor(private memberService: MemberService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { memberId } = req.params;
    const member = await this.memberService.findOne(+memberId);
    if (!member) {
      throw new NotFoundException(`member with id:${memberId} does not exist`);
    }
    res.cookie('currentProject', member.projectId);
    req.member = member;
    next();
  }
}
