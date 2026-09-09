import { prisma } from '../config/db.js';
import { client } from '../config/redis.js';
import { evaluateAnswerWithAi } from '../lib/evaluateAnswer.js';
import { getSession } from '../modules/anonymous/service.js';
import type { EvaluateAnswerJob } from './evaluateAnswer.js';

export async function processEvaluateAnswer(job: EvaluateAnswerJob) {
  if (job.kind === 'auth') {
    const answer = await prisma.answer.findUnique({
      where: {
        sessionId_questionId: {
          sessionId: job.sessionId,
          questionId: job.questionId,
        },
      },
      include: {
        question: true,
      },
    });
    if (!answer) return;

    const { feedback, score, isCorrect } = await evaluateAnswerWithAi({
      prompt: answer.question.prompt,
      difficulty: answer.question.difficulty,
      response: answer.response,
    });

    await prisma.answer.update({
      where: {
        sessionId_questionId: {
          sessionId: job.sessionId,
          questionId: job.questionId,
        },
      },
      data: { feedback, score, isCorrect },
    });
  } else if (job.kind === 'anon') {
    const session = await getSession(job.sessionId);
    if (!session) return;

    const existingAnswer = session.answers.find((answer) => answer.questionId === job.questionId);
    if (!existingAnswer) return;

    const question = await prisma.question.findUnique({
      where: { id: job.questionId },
    });
    if (!question) return;

    const { feedback, score, isCorrect } = await evaluateAnswerWithAi({
      prompt: question.prompt,
      difficulty: question.difficulty,
      response: existingAnswer.response,
    });

    existingAnswer.feedback = feedback;
    existingAnswer.score = score;
    existingAnswer.isCorrect = isCorrect;

    await client.set(`anon:session:${session.id}`, JSON.stringify(session), 'EX', 60 * 45);
  }
}
