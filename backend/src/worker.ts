import { env } from './config/env';

// Placeholder entrypoint only. Real BullMQ processors (reading from Redis,
// calling the AI provider, writing results back) are built in M6/M7.
console.log(`[worker] placeholder entrypoint booted (env: ${env.NODE_ENV})`);
