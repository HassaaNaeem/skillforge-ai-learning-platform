import { z } from 'zod';

export const focusQueueSchema = z.object({
  topicIds: z.array(z.string().uuid()).max(50),
});

export type FocusQueueInput = z.infer<typeof focusQueueSchema>;
