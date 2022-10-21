import { TaskStatusMiddleware } from './task-status.middleware';

describe('TaskStatusMiddleware', () => {
  it('should be defined', () => {
    expect(new TaskStatusMiddleware()).toBeDefined();
  });
});
