import { TaskStatusService } from './../../task-status/task-status.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TaskStatusMiddleware implements NestMiddleware {
  constructor(private taskStatusServise: TaskStatusService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { taskStatusId } = req.params;
    const taskStatus = await this.taskStatusServise.findOne(+taskStatusId);
    res.cookie('currentProject', taskStatus.projectId);
    req.taskStatus = taskStatus;
    next();
  }
}
