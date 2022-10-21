import { TaskMiddleware } from './task.middleware';

describe('TaskMiddleware', () => {
  it('should be defined', () => {
    expect(new TaskMiddleware()).toBeDefined();
  });
});
