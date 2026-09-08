import { client } from '../config/redis.js';

export const CATALOG_TTL_SECONDS = 60 * 10;

export function topicsListKey() {
  return 'cache:topics:list';
}

export function topicKey(id: string) {
  return `cache:topics:${id}`;
}

export function questionsKey(topicId: string, difficulty?: string) {
  return `cache:questions:${topicId}:${difficulty ?? 'all'}`;
}

export async function cacheAside<T>(
  key: string,
  load: () => Promise<T>,
  ttlSeconds = CATALOG_TTL_SECONDS,
): Promise<T> {
  const raw = await client.get(key);
  if (raw) {
    return JSON.parse(raw) as T;
  }

  const fresh = await load();
  if (fresh !== null && fresh !== undefined) {
    await client.set(key, JSON.stringify(fresh), 'EX', ttlSeconds);
  }
  return fresh;
}

export async function invalidateCatalogCache(topicId?: string) {
  const keys = [topicsListKey()];
  if (topicId) {
    keys.push(topicKey(topicId));
    keys.push(questionsKey(topicId), questionsKey(topicId, 'easy'), questionsKey(topicId, 'medium'), questionsKey(topicId, 'hard'));
  }
  await client.del(...keys);
}
