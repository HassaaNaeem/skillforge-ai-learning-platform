import type { NextFunction, Request, Response } from 'express';
import * as anonymousService from './service.js';

export async function createSession(req: Request, res: Response, next: NextFunction) {
  try {
    const session = await anonymousService.createSession(req.body)
    return res.status(201).json({session})
  } catch (error) {
    next(error);
  }
}

export async function getSession(req: Request, res: Response, next: NextFunction) {
  try {
    const sessionId = req.params.sessionId;
    if(!sessionId || Array.isArray(sessionId)){
      return res.status(400).json({message:"Invalid session id"})
    }
    const session = await anonymousService.getSession(sessionId)
    if(!session){
      return res.status(404).json({message: "Session not found or expired"})
    }
    return res.status(200).json({session})

  } catch (error) {
    next(error);
  }
}
