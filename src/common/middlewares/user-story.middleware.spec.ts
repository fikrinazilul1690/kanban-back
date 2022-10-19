import { UserStoryMiddleware } from './user-story.middleware';

describe('UserStoryMiddleware', () => {
  it('should be defined', () => {
    expect(new UserStoryMiddleware()).toBeDefined();
  });
});
