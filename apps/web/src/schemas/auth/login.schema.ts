import { z } from 'zod';

import { MIN_PASSWORD_LENGTH } from '@/libs/constants/account.constants';

export const loginSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(MIN_PASSWORD_LENGTH),
  pin: z.string().optional(),
  captcha: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
