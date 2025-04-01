import { z } from 'zod';

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  captcha: z.string(),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
