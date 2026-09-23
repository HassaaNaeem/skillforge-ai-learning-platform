import { prisma } from '../../config/db.js';
import { uploadAvatarBuffer } from '../../lib/uploadAvatar.js';
import { toSafeUser, type SafeUser } from '../auth/types.js';
import { AppError } from '../../utils/AppError.js';

export async function updateAvatar(userId: string, buffer: Buffer): Promise<SafeUser> {
  const avatarUrl = await uploadAvatarBuffer(buffer, userId);
  const user = await prisma.user.update({
    where: { id: userId },
    data: { avatarUrl },
  });
  if (!user) throw new AppError(404, 'User not found');
  return toSafeUser(user);
}
