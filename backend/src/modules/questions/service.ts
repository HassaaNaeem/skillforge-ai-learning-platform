import { prisma } from "../../config/db.js";

export async function listQuestions(topicId: string, difficulty?: string){
    const questions = await prisma.question.findMany({
        where: {
            difficulty: {
                in: ['easy', 'medium', 'hard'],
            },
            topicId,
        },
    })
    if(!questions) return []
    return questions
}