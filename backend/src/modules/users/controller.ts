import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../../utils/AppError.js';
import * as usersService from './service.js';

export async function uploadAvatar(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError(401, 'Unauthorized');
    if (!req.file) throw new AppError(400, 'Avatar file is required');
    const user = await usersService.updateAvatar(req.user.id, req.file.buffer);
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
}
