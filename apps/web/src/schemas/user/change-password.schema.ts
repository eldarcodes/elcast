import { z } from 'zod';

import { MIN_PASSWORD_LENGTH } from '@/libs/constants/account.constants';

export const changePasswordSchema = z.object({
  oldPassword: z.string().optional(),
  newPassword: z.string().min(MIN_PASSWORD_LENGTH),
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
