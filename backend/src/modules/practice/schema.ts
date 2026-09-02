import { z } from "zod"

export const practiceSchema = z.object({
    topicId: z.string().uuid(),
    mode: z.string().min(1),
    difficulty: z.enum(['easy', 'medium', 'hard']),
})

export type PracticeInput = z.input<typeof practiceSchema>