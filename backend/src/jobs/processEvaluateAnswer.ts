import { prisma } from '../config/db.js';
import { client } from '../config/redis.js';
import { getSession } from '../modules/anonymous/service.js';
import type { EvaluateAnswerJob } from './evaluateAnswer.js';

export async function processEvaluateAnswer(job: EvaluateAnswerJob) {
  const stub = 'Queued. AI evaluation arrives in M7.';
  if (job.kind === 'auth') {
    await prisma.answer.update({
      where: {
        sessionId_questionId: {
          sessionId: job.sessionId,
          questionId: job.questionId,
        },
      },
      data: { feedback: stub },
    });
  } else if (job.kind === 'anon') {
    const session = await getSession(job.sessionId);
    if (!session) return;

    const existingAnswer = session.answers.find((answer) => answer.questionId === job.questionId);
    if (!existingAnswer) return;

    existingAnswer.feedback = stub;

    await client.set(`anon:session:${session.id}`, JSON.stringify(session), 'EX', 60 * 45);
  }
}
