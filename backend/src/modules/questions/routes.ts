import { Router } from "express";
import { listQuestionsController } from "./controller.js";

const router = Router()

router.get('/', listQuestionsController)

export default router