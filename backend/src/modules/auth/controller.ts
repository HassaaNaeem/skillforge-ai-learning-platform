import type { NextFunction, Request, Response } from 'express';
import { clearAuthCookies, setAuthCookies } from '../../utils/authCookies.js';
import { signAccessToken, signRefreshToken } from '../../utils/tokens.js';
import * as authService from './service.js';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.register(req.body);

    const tokens = {
      accessToken: signAccessToken(user),
      refreshToken: signRefreshToken(user),
    };

    setAuthCookies(res, tokens);

    return res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.login(req.body);

    const tokens = {
      accessToken: signAccessToken(user),
      refreshToken: signRefreshToken(user),
    };

    setAuthCookies(res, tokens);

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    return res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
}

export async function logout(_req: Request, res: Response, next: NextFunction) {
  try {
    clearAuthCookies(res);
    return res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    next(error);
  }
}
