import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary.js';
import { AppError } from '../utils/AppError.js';

export function uploadAvatarBuffer(buffer: Buffer, userId: string): Promise<string> {
  if (!isCloudinaryConfigured()) {
    throw new AppError(503, 'Cloudinary is not configured');
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'skillforge/avatars',
        public_id: userId,
        overwrite: true,
        resource_type: 'image',
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          reject(new AppError(502, 'Could not upload image'));
          return;
        }
        resolve(result.secure_url);
      },
    );
    stream.end(buffer);
  });
}
