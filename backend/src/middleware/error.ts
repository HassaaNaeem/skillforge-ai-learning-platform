import type { NextFunction, Request, Response } from 'express';
import multer from 'multer';
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
      : error instanceof multer.MulterError
        ? new AppError(
            400,
            error.code === 'LIMIT_FILE_SIZE' ? 'Avatar must be under 2MB' : error.message,
          )
        : new AppError(500, error instanceof Error ? error.message : 'Internal server error');

  if (appError.statusCode >= 500) {
    console.error(error);
  }

  res.status(appError.statusCode).json({
    message: appError.message,
    ...(appError.details ? { details: appError.details } : {}),
  });
}
