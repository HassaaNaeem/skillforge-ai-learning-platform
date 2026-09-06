import { Worker } from 'bullmq';
import { env } from './config/env.js';
import { bullmqConnection } from './config/bullmq.js';
import { EVALUATE_QUEUE } from './jobs/evaluateAnswer.js';
import { processEvaluateAnswer } from './jobs/processEvaluateAnswer.js';

const worker = new Worker(
  EVALUATE_QUEUE,
  async (job) => {
    await processEvaluateAnswer(job.data);
  },
  { connection: bullmqConnection },
);

worker.on('completed', (job) => {
  console.log(`[worker] completed ${job.name} ${job.id}`);
});

worker.on('failed', (job, error) => {
  console.error(`[worker] failed ${job?.id}`, error);
});

console.log(`[worker] listening on queue "${EVALUATE_QUEUE}" (env: ${env.NODE_ENV})`);
