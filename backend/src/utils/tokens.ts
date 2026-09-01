import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../config/db.js';
import { toSafeUser, type SafeUser } from '../modules/auth/types.js';
import { AppError } from './AppError.js';

type AccessTokenPayload = {
  userId: string;
};

export function signAccessToken(user: SafeUser): string {
  return jwt.sign({ userId: user.id }, env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
}

export function signRefreshToken(user: SafeUser): string {
  return jwt.sign({ userId: user.id }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

export async function verifyAccessToken(token: string): Promise<SafeUser> {
  const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;

  const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
  if (!user) {
    throw new AppError(401, 'Invalid token');
  }

  return toSafeUser(user);
}
