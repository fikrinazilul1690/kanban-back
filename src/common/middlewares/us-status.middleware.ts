import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsStatusService } from 'src/us-status/us-status.service';

@Injectable()
export class UsStatusMiddleware implements NestMiddleware {
  constructor(private usStatusServise: UsStatusService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { usStatusId } = req.params;
    const usStatus = await this.usStatusServise.findOne(+usStatusId);
    res.cookie('currentProject', usStatus.projectId);
    req.usStatus = usStatus;
    next();
  }
}
