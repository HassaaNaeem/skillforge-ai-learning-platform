import { Router } from 'express';
import { validateBody } from '../../middleware/validate.js';
import * as anonymousController from './controller.js';
import { createAnonymousSessionSchema } from './schema.js';

const router = Router();

router.post('/sessions', validateBody(createAnonymousSessionSchema), anonymousController.createSession);
router.get('/sessions/:sessionId', anonymousController.getSession);

export default router;
