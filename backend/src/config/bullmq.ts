import Redis from 'ioredis';
import { env } from './env.js';

// BullMQ needs its own connection. Do not reuse `client` from redis.ts:
// workers use blocking commands, and maxRetriesPerRequest must be null.
export const bullmqConnection = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});
