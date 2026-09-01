import type { SafeUser } from '../modules/auth/types.js';

declare global {
  namespace Express {
    interface Request {
      user?: SafeUser;
    }
  }
}

export {};
