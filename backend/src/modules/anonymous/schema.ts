import { z } from "zod"

export const createAnonymousSessionSchema = z.object({
    topicId: z.string().uuid(),
    mode: z.enum(['practice', 'exam']),
    difficulty: z.enum(['easy', 'medium', 'hard']),
})

export type CreateAnonymousSessionInput = z.infer<typeof createAnonymousSessionSchema>