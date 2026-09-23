export const EVALUATION_CHANNEL = 'evaluation:ready';
export const JOIN_SESSION = 'join-session';
export const LEAVE_SESSION = 'leave-session';
export const EVALUATION_READY = 'evaluation:ready';

export type EvaluationReadyPayload = {
  sessionId: string;
  questionId: string;
};

export function sessionRoom(sessionId: string) {
  return `session:${sessionId}`;
}
