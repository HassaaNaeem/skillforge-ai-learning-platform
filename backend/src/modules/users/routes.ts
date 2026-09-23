import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import { avatarUpload } from '../../middleware/upload.js';
import { validateBody } from '../../middleware/validate.js';
import { uploadAvatar, updateFocusQueue } from './controller.js';
import { focusQueueSchema } from './schema.js';

const router = Router();

router.post('/me/avatar', requireAuth, avatarUpload.single('avatar'), uploadAvatar);
router.patch('/me/focus', requireAuth, validateBody(focusQueueSchema), updateFocusQueue);

export default router;
