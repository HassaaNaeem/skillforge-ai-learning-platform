import { Router } from "express"
import { createPracticeSessionController } from "./controller.js"
import { requireAuth } from "../../middleware/auth.js"
import { validateBody } from "../../middleware/validate.js"
import { practiceSchema } from "./schema.js"

const router = Router()
router.post('/', requireAuth, validateBody(practiceSchema), createPracticeSessionController)
export default router