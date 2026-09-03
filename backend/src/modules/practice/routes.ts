import { Router } from "express"
import { createPracticeSessionController, submitAnswerController } from "./controller.js"
import { requireAuth } from "../../middleware/auth.js"
import { validateBody } from "../../middleware/validate.js"
import { answerSchema, practiceSchema } from "./schema.js"

const router = Router()

router.post('/sessions', requireAuth, validateBody(practiceSchema), createPracticeSessionController)
router.post('/sessions/:sessionId/answers', requireAuth, validateBody(answerSchema), submitAnswerController)

export default router