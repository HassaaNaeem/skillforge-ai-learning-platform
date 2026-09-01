import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/tokens.js';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.accessToken;

    if (!token || typeof token !== 'string') {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    req.user = await verifyAccessToken(token);
    next();
  } catch (error) {
    next(error);
  }
}
