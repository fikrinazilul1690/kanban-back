import { Member, User, UsStatus, UserStory } from '@prisma/client';

declare global {
  namespace Express {
    export interface Request {
      member?: Member;
      user?: User;
      usStatus?: UsStatus;
      userStory?: UserStory;
    }
  }
}
