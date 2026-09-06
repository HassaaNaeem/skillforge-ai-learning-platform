import { NextFunction, Request, Response } from "express"
import { createPracticeSession, getPracticeSession, submitAnswer } from "./service.js"
import { AppError } from "../../utils/AppError.js"
import { AnswerInput } from "./schema.js"

export async function createPracticeSessionController(req: Request, res: Response, next: NextFunction) {
    try {
        const {topicId, mode, difficulty} = req.body
        if(!req.user) throw new AppError(401, "Unauthorized")
        const practiceSession = await createPracticeSession(req.user.id, topicId, mode, difficulty)
        res.status(201).json({practiceSession})
    } catch (error) {
        next(error)
    }   
}

export async function getPracticeSessionController(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.user) throw new AppError(401, "Unauthorized")
        const sessionId = req.params.sessionId
        if (!sessionId) throw new AppError(400, "Session ID is required")
        const practiceSession = await getPracticeSession(sessionId, req.user.id)
        res.status(200).json({ practiceSession })
    } catch (error) {
        next(error)
    }
}

export async function submitAnswerController(req: Request, res: Response, next: NextFunction) {
    try {
        const {questionId, response} = req.body as AnswerInput
        if(!req.user) throw new AppError(401, "Unauthorized")
        const answer = await submitAnswer(req.params.sessionId as string, questionId, response, req.user.id)
        res.status(201).json({answer})
    } catch (error) {
        next(error)
    }
}