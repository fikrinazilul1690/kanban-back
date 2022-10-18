import { Member, User, UsStatus } from '@prisma/client';

declare global {
  namespace Express {
    export interface Request {
      member?: Member;
      user?: User;
      usStatus?: UsStatus;
    }
  }
}
