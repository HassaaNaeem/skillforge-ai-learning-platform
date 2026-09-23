import { prisma } from '../../config/db.js';

function average(values: number[]) {
  if (!values.length) return null;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

export async function getDashboard(userId: string) {
  const [sessions, topics, user] = await Promise.all([
    prisma.practiceSession.findMany({
      where: { userId },
      orderBy: { startedAt: 'asc' },
      include: {
        topic: { select: { id: true, name: true, slug: true } },
        answers: { select: { score: true, isCorrect: true } },
      },
    }),
    prisma.topic.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, slug: true },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: { focusTopicIds: true },
    }),
  ]);

  const sessionRows = sessions.map((session) => {
    const scores = session.answers
      .map((answer) => answer.score)
      .filter((score): score is number => typeof score === 'number');
    return {
      id: session.id,
      topicId: session.topicId,
      topicName: session.topic.name,
      difficulty: session.difficulty,
      startedAt: session.startedAt,
      answerCount: session.answers.length,
      averageScore: average(scores),
    };
  });

  const allScores = sessions.flatMap((session) =>
    session.answers
      .map((answer) => answer.score)
      .filter((score): score is number => typeof score === 'number'),
  );
  const allAnswers = sessions.flatMap((session) => session.answers);
  const passed = allAnswers.filter((answer) => answer.isCorrect).length;

  const topicById = new Map(topics.map((topic) => [topic.id, topic]));
  const savedIds = user?.focusTopicIds ?? [];
  const orderedIds = savedIds.filter((id) => topicById.has(id));
  const remaining = topics.filter((topic) => !orderedIds.includes(topic.id));
  const focusTopics = [...orderedIds.map((id) => topicById.get(id)!), ...remaining];

  return {
    summary: {
      sessionCount: sessions.length,
      answerCount: allAnswers.length,
      averageScore: average(allScores),
      passRate: allAnswers.length ? Math.round((passed / allAnswers.length) * 100) : null,
    },
    sessions: [...sessionRows].reverse(),
    chart: sessionRows
      .filter((session) => session.averageScore !== null)
      .map((session) => ({
        label: new Date(session.startedAt).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        }),
        averageScore: session.averageScore,
      })),
    focusTopics,
  };
}
