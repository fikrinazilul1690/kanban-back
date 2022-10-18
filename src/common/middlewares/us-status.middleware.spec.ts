import { UsStatusMiddleware } from './us-status.middleware';

describe('UsStatusMiddleware', () => {
  it('should be defined', () => {
    expect(new UsStatusMiddleware()).toBeDefined();
  });
});
