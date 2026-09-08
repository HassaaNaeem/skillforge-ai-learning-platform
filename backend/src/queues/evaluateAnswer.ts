import { Queue } from 'bullmq';
import { EvaluateAnswerJob, queueName } from '../jobs/evaluateAnswer.js';
import { connection } from '../config/bullmq.js';

const queue = new Queue(queueName, { connection });

export async function enqueueEvaluateAnswer(job: EvaluateAnswerJob) {
  await queue.add('evaluate', job, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  });
}
