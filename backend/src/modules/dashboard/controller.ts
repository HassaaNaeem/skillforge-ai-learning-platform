import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../../utils/AppError.js';
import { getDashboard } from './service.js';

export async function getDashboardController(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError(401, 'Unauthorized');
    const dashboard = await getDashboard(req.user.id);
    return res.status(200).json({ dashboard });
  } catch (error) {
    next(error);
  }
}
