import type { Server as HttpServer } from 'node:http';
import Redis from 'ioredis';
import { Server } from 'socket.io';
import { env } from '../config/env.js';
import {
  EVALUATION_CHANNEL,
  EVALUATION_READY,
  JOIN_SESSION,
  LEAVE_SESSION,
  sessionRoom,
  type EvaluationReadyPayload,
} from './events.js';

export function attachSockets(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: env.NODE_ENV === 'development' ? 'http://localhost:5173' : undefined,
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on(JOIN_SESSION, (sessionId: unknown) => {
      if (typeof sessionId !== 'string' || !sessionId) return;
      void socket.join(sessionRoom(sessionId));
    });

    socket.on(LEAVE_SESSION, (sessionId: unknown) => {
      if (typeof sessionId !== 'string' || !sessionId) return;
      void socket.leave(sessionRoom(sessionId));
    });
  });

  const subscriber = new Redis(env.REDIS_URL);
  void subscriber.subscribe(EVALUATION_CHANNEL);
  subscriber.on('message', (channel, message) => {
    if (channel !== EVALUATION_CHANNEL) return;
    try {
      const payload = JSON.parse(message) as EvaluationReadyPayload;
      if (!payload.sessionId) return;
      io.to(sessionRoom(payload.sessionId)).emit(EVALUATION_READY, payload);
    } catch {
      console.error('[sockets] invalid evaluation payload');
    }
  });

  return io;
}
