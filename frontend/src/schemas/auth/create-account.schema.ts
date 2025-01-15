import { z } from 'zod';

export const createAccountSchema = z.object({
  username: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/),
  email: z.string().email(),
  password: z.string().min(8),
});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;
