import { Router } from "express";
import { getTopicController, getTopicsController } from "./controller.js";

const router = Router()

router.get('/', getTopicsController)
router.get('/:id', getTopicController)

export default router