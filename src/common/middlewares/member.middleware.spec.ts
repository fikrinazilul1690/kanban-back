import { MemberMiddleware } from './member.middleware';

describe('MemberMiddleware', () => {
  it('should be defined', () => {
    expect(new MemberMiddleware()).toBeDefined();
  });
});
