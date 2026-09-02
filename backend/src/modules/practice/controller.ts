import { NextFunction, Request, Response } from "express"
import { createPracticeSession } from "./service.js"
import { AppError } from "../../utils/AppError.js"

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