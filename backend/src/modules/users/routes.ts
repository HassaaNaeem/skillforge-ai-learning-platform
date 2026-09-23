import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import { avatarUpload } from '../../middleware/upload.js';
import { uploadAvatar } from './controller.js';

const router = Router();

router.post('/me/avatar', requireAuth, avatarUpload.single('avatar'), uploadAvatar);

export default router;
