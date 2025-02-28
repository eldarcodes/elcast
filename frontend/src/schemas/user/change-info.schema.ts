import { z } from 'zod';

import {
  MAX_BIO_LENGTH,
  MIN_USERNAME_LENGTH,
  USERNAME_REGEX,
} from '@/libs/constants/account.constants';

export const changeInfoSchema = z.object({
  username: z.string().min(MIN_USERNAME_LENGTH).regex(USERNAME_REGEX),
  displayName: z.string().min(1),
  bio: z.string().max(MAX_BIO_LENGTH),
});

export type ChangeInfoSchema = z.infer<typeof changeInfoSchema>;
