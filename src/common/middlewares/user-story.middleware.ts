import { UserStoryService } from './../../user-story/user-story.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class UserStoryMiddleware implements NestMiddleware {
  constructor(private usService: UserStoryService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('midd');
    const { usId } = req.params;
    const userStory = await this.usService.findOne(+usId);
    console.log('middleware');
    res.cookie('currentProject', userStory.projectId);
    req.userStory = userStory;
    next();
  }
}
