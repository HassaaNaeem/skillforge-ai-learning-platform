import bcrypt from 'bcryptjs';
import { prisma } from '../../config/db.js';
import { AppError } from '../../utils/AppError.js';
import type { LoginInput, RegisterInput } from './schema.js';
import { toSafeUser, type SafeUser } from './types.js';

export async function register(input: RegisterInput): Promise<SafeUser> {
  const { name, email, password } = input;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError(409, 'Email already taken');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, passwordHash } });

  return toSafeUser(user);
}

export async function login(input: LoginInput): Promise<SafeUser> {
  const { email, password } = input;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError(401, 'Invalid email or password');
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new AppError(401, 'Invalid email or password');
  }

  return toSafeUser(user);
}

export async function getCurrentUser(userId: string): Promise<SafeUser | null> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return null;
  }

  return toSafeUser(user);
}
