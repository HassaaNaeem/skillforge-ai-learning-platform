import { Router } from "express"
import { createPracticeSessionController, getPracticeSessionController, submitAnswerController } from "./controller.js"
import { requireAuth } from "../../middleware/auth.js"
import { validateBody } from "../../middleware/validate.js"
import { answerSchema, practiceSchema } from "./schema.js"

const router = Router()

router.post('/sessions', requireAuth, validateBody(practiceSchema), createPracticeSessionController)
router.get('/sessions/:sessionId', requireAuth, getPracticeSessionController)
router.post('/sessions/:sessionId/answers', requireAuth, validateBody(answerSchema), submitAnswerController)

export default router