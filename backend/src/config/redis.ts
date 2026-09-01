import Redis from 'ioredis';
import { env } from './env.js';
export const client = new Redis(env.REDIS_URL);


