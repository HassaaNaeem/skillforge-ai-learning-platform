import { Worker } from 'bullmq';
import { type EvaluateAnswerJob, queueName } from './jobs/evaluateAnswer.js';
import { connection } from './config/bullmq.js';
import { processEvaluateAnswer } from './jobs/processEvaluateAnswer.js';

const worker = new Worker<EvaluateAnswerJob>(
  queueName,
  async (job) => {
    await processEvaluateAnswer(job.data);
  },
  { connection },
);

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully!`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ${job?.id} failed with error:`, err.message);
});
