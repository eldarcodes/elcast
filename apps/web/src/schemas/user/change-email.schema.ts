import { z } from 'zod';

export const changeEmailSchema = z.object({
  email: z.string().email(),
  pin: z.string().optional(),
});

export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>;
