import { prisma } from "../../config/db.js";

export async function getTopics(){
    const topics = await prisma.topic.findMany(
        {
            include: {
              _count: {
                select: { questions: true },
              },
            },
          }
    )
    return topics
}

export async function getTopic(id: string){
    const topic = await prisma.topic.findUnique({
        where: { id },
        include: {
            questions: true,
        },
    })
    return topic
}