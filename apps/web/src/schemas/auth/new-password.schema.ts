import { z } from 'zod';

import { MIN_PASSWORD_LENGTH } from '@/libs/constants/account.constants';

export const newPasswordSchema = z
  .object({
    password: z.string().min(MIN_PASSWORD_LENGTH),
    passwordRepeat: z.string().min(MIN_PASSWORD_LENGTH),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    path: ['passwordRepeat'],
  });

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>;
