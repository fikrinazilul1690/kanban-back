import { TaskService } from './../../task/task.service';
import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TaskMiddleware implements NestMiddleware {
  constructor(private taskService: TaskService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { taskId } = req.params;
    if (Number(taskId)) {
      const { taskId } = req.params;
      const task = await this.taskService.findOne(+taskId);
      res.cookie('currentProject', task.projectId);
      req.task = task;
      next();
    } else if (taskId === 'update-order') {
      next();
    } else {
      throw new NotFoundException();
    }
  }
}
