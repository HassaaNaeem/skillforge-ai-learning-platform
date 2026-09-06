import { prisma } from '../config/db.js';
import { getSession } from '../modules/anonymous/service.js';
import { client } from '../config/redis.js';
import type { EvaluateAnswerJob } from './evaluateAnswer.js';

/**
 * M6 stub only — no AI yet.
 * Write a placeholder so you can see the worker did something.
 * M7 will replace this with a real model call.
 */
export async function processEvaluateAnswer(job: EvaluateAnswerJob) {
  const stubFeedback = 'Queued. AI evaluation arrives in M7.';

  if (job.kind === 'auth') {
    // TODO (you): prisma.answer.update
    // where: { sessionId_questionId: { sessionId: job.sessionId, questionId: job.questionId } }
    // data: { feedback: stubFeedback }
    void prisma;
    void stubFeedback;
    throw new Error('TODO: update Postgres Answer.feedback for auth jobs');
  }

  // anon
  const session = await getSession(job.sessionId);
  if (!session) return;

  // TODO (you): find the answer in session.answers, set feedback, SET Redis again with EX 45 min
  // Same key pattern as anonymous/service.ts: anon:session:{id}
  void client;
  throw new Error('TODO: update Redis anonymous answer feedback');
}
