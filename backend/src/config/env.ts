import 'dotenv/config';
import { z } from 'zod';

// M0 only validated NODE_ENV/PORT. M1 adds the Neon connection strings:
// DATABASE_URL (pooled, used by the app) and DIRECT_URL (non-pooled, used
// by Prisma Migrate). REDIS_URL, JWT secrets, etc. get added in M2/M5.
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1),
});

export const env = envSchema.parse(process.env);
