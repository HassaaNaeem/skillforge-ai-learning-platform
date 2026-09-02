import { prisma } from "../../config/db.js"
import { AppError } from "../../utils/AppError.js"

export async function createPracticeSession(userId: string, topicId: string, mode: string, difficulty: string){
    const topic = await prisma.topic.findUnique({
        where: {
            id: topicId,
        },
    })
    if(!topic) throw new AppError(404, "Topic not found")
    const practiceSession = await prisma.practiceSession.create({
        data: {
            userId,
            topicId,
            mode,
            difficulty,
        },
    })
    return practiceSession
}