import OpenAI from 'openai';
import { z } from 'zod';
import { env } from '../config/env.js';

const evaluationSchema = z.object({
  feedback: z.string().min(1),
  score: z.number().int().min(0).max(100),
  isCorrect: z.boolean(),
});

export type AnswerEvaluation = z.infer<typeof evaluationSchema>;

const client = new OpenAI({ apiKey: env.API_KEY });

export async function evaluateAnswerWithAi(input: {
  prompt: string;
  response: string;
  difficulty: string;
}): Promise<AnswerEvaluation> {
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          'You are a senior interviewer grading an open-ended developer practice answer. Reply with JSON only, keys: feedback (string), score (integer 0-100), isCorrect (boolean). isCorrect is true if this would pass a junior-to-mid interview for the question. feedback is 2-4 sentences, specific to what they wrote, and names gaps. Do not rewrite the whole answer.',
      },
      {
        role: 'user',
        content: `Difficulty: ${input.difficulty}\nQuestion: ${input.prompt}\nCandidate answer:\n${input.response}`,
      },
    ],
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error('Empty AI evaluation');

  return evaluationSchema.parse(JSON.parse(raw));
}
