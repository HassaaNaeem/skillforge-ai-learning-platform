import { prisma } from "../../config/db.js";
import { cacheAside, questionsKey } from "../../utils/cache.js";

export async function listQuestions(topicId: string, difficulty?: string) {
  return cacheAside(questionsKey(topicId, difficulty), () =>
    prisma.question.findMany({
      where: {
        topicId,
        difficulty: difficulty ?? undefined,
      },
    }),
  );
}
