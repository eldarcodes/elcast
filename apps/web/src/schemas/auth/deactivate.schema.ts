import { z } from 'zod';

import { MIN_PASSWORD_LENGTH } from '@/libs/constants/account.constants';

export const deactivateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(MIN_PASSWORD_LENGTH),
  pin: z.string().optional(),
});

export type DeactivateSchema = z.infer<typeof deactivateSchema>;
