import multer from 'multer';
import { AppError } from '../utils/AppError.js';

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export const avatarUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_TYPES.has(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new AppError(400, 'Avatar must be a JPEG, PNG, or WebP image'));
  },
});
