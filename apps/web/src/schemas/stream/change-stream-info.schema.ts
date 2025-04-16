import { z } from 'zod';

export const changeStreamInfoSchema = z.object({
  title: z.string().min(1),
  categoryId: z.string().min(1),
  tags: z.array(z.string()).optional(),
});

export type ChangeStreamInfoSchema = z.infer<typeof changeStreamInfoSchema>;
