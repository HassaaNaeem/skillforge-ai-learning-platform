import { prisma } from "../../config/db.js";

export async function listQuestions(topicId: string, difficulty?: string) {
  const questions = await prisma.question.findMany({
    where: {
      topicId,
      difficulty: difficulty ?? undefined,
    },
  });

  return questions;
}
