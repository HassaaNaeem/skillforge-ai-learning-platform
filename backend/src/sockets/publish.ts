import { client } from '../config/redis.js';
import { EVALUATION_CHANNEL, type EvaluationReadyPayload } from './events.js';

export async function publishEvaluationReady(payload: EvaluationReadyPayload) {
  await client.publish(EVALUATION_CHANNEL, JSON.stringify(payload));
}
