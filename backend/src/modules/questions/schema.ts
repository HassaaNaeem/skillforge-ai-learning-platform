import { z } from "zod"

export const questionSchema = z.object({
    topicId: z.string().uuid(),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional()
})