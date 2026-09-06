import { prisma } from "../../config/db.js";
import { cacheAside, topicKey, topicsListKey } from "../../utils/cache.js";

export async function getTopics() {
  return cacheAside(topicsListKey(), () =>
    prisma.topic.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
    }),
  );
}

export async function getTopic(id: string) {
  return cacheAside(topicKey(id), () =>
    prisma.topic.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    }),
  );
}
