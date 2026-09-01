import type { Response } from 'express';
import type { AuthTokens } from '../modules/auth/types.js';

export function setAuthCookies(_res: Response, _tokens: AuthTokens): void {
  _res.cookie('accessToken', _tokens.accessToken, {httpOnly:true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production'})
  _res.cookie('refreshToken', _tokens.refreshToken, {httpOnly:true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production'})

}

export function clearAuthCookies(_res: Response): void {
  _res.clearCookie('accessToken')
  _res.clearCookie('refreshToken')
}
