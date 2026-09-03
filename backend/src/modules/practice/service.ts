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

export async function submitAnswer(practiceSessionId: string, questionId: string, response: string, userId: string){
    const practiceSession = await prisma.practiceSession.findUnique({
        where: {
            id: practiceSessionId,
        },
    })
    if(!practiceSession) throw new AppError(404, "Practice session not found")
    if(practiceSession.userId !== userId) throw new AppError(403, "You are not authorized to submit answer for this practice session")
    const question = await prisma.question.findUnique({
        where: {
            id: questionId,
        },
    })
    if(!question) throw new AppError(404, "Question not found")

    if(question.topicId !== practiceSession.topicId) throw new AppError(400, "Question does not belong to the practice session topic")

    const isUnique = await prisma.answer.findUnique({
            where: {
                sessionId_questionId: {
                    sessionId: practiceSessionId,
                    questionId,
                },
            },
        })
    if(isUnique) throw new AppError(400, "Question already answered")
    const answer = await prisma.answer.create({
        data: {
            sessionId: practiceSession.id,
            questionId: question.id,
            response,
            isCorrect: false,
        },
    })
    return answer
}