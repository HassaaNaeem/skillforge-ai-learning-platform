import type { NextFunction, Request, Response } from "express";
import { listQuestions } from "./service.js";
import { questionSchema } from "./schema.js";
import { AppError } from "../../utils/AppError.js";

export async function listQuestionsController(req: Request, res: Response, next: NextFunction){
    try {
        const parsed = questionSchema.safeParse(req.query)
        if(!parsed.success) throw new AppError(400, parsed.error.message)
        const {topicId, difficulty} = parsed.data
        const questions = await listQuestions(topicId, difficulty ?? undefined)
        res.status(200).json({questions})
    } catch (error) {
        next(error)
    }
}