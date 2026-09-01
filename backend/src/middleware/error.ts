import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const appError =
    error instanceof AppError
      ? error
      : new AppError(500, error instanceof Error ? error.message : 'Internal server error');

  if (appError.statusCode >= 500) {
    console.error(error);
  }

  res.status(appError.statusCode).json({
    message: appError.message,
    ...(appError.details ? { details: appError.details } : {}),
  });
}
