import { Queue } from 'bullmq';
import { bullmqConnection } from '../config/bullmq.js';
import { EVALUATE_QUEUE, type EvaluateAnswerJob } from '../jobs/evaluateAnswer.js';

export const evaluateAnswerQueue = new Queue<EvaluateAnswerJob>(EVALUATE_QUEUE, {
  connection: bullmqConnection,
});

export async function enqueueEvaluateAnswer(job: EvaluateAnswerJob) {
  // TODO (you): add the job to the queue.
  // Look up: evaluateAnswerQueue.add(name, data, options)
  // Use name: 'evaluate'
  // data: job
  // options worth adding: attempts: 3, backoff: { type: 'exponential', delay: 1000 }
  void job;
  throw new Error('TODO: enqueueEvaluateAnswer — call evaluateAnswerQueue.add');
}
