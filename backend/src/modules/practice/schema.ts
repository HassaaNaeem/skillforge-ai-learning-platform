import { z } from "zod"

export const practiceSchema = z.object({
    topicId: z.string().uuid(),
    mode: z.string().min(1),
    difficulty: z.enum(['easy', 'medium', 'hard']),
})

export const answerSchema = z.object({
    questionId: z.string().uuid(),
    response: z.string().min(1),
})


export type PracticeInput = z.infer<typeof practiceSchema>
export type AnswerInput = z.infer<typeof answerSchema>