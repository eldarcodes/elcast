import { z } from 'zod';

import {
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  USERNAME_REGEX,
} from '@/libs/constants/account.constants';

export const createAccountSchema = z.object({
  username: z.string().min(MIN_USERNAME_LENGTH).regex(USERNAME_REGEX),
  email: z.string().email(),
  password: z.string().min(MIN_PASSWORD_LENGTH),
  captcha: z.string(),
});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;
