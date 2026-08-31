import 'dotenv/config';
import { z } from 'zod';

// M0 only validates the handful of vars the bare server/worker entrypoints
// need to boot. DATABASE_URL, REDIS_URL, JWT secrets, etc. get added here
// as each milestone that needs them is built (M1, M2, M5...).
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
});

export const env = envSchema.parse(process.env);
