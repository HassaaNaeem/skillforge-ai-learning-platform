import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import { getDashboardController } from './controller.js';

const router = Router();

router.get('/', requireAuth, getDashboardController);

export default router;
