import { prisma } from '../../config/db.js';
import { uploadAvatarBuffer } from '../../lib/uploadAvatar.js';
import { toSafeUser, type SafeUser } from '../auth/types.js';
import { AppError } from '../../utils/AppError.js';
import type { FocusQueueInput } from './schema.js';

export async function updateAvatar(userId: string, buffer: Buffer): Promise<SafeUser> {
  const avatarUrl = await uploadAvatarBuffer(buffer, userId);
  const user = await prisma.user.update({
    where: { id: userId },
    data: { avatarUrl },
  });
  if (!user) throw new AppError(404, 'User not found');
  return toSafeUser(user);
}

export async function updateFocusQueue(userId: string, input: FocusQueueInput) {
  const uniqueIds = [...new Set(input.topicIds)];
  const topics = await prisma.topic.findMany({
    where: { id: { in: uniqueIds } },
    select: { id: true },
  });
  if (topics.length !== uniqueIds.length) {
    throw new AppError(400, 'One or more topics were not found');
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { focusTopicIds: uniqueIds },
    select: { focusTopicIds: true },
  });
  return user.focusTopicIds;
}
