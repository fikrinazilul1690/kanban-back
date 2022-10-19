import { UserStoryService } from './../../user-story/user-story.service';
import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class UserStoryMiddleware implements NestMiddleware {
  constructor(private usService: UserStoryService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { usId } = req.params;
    if (Number(usId)) {
      console.log('midd');
      const { usId } = req.params;
      const userStory = await this.usService.findOne(+usId);
      console.log('middleware');
      res.cookie('currentProject', userStory.projectId);
      req.userStory = userStory;
      next();
    } else if (usId === 'update-order') {
      next();
    } else {
      throw new NotFoundException();
    }
  }
}
