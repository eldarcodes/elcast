import { z } from 'zod';

import {
  MIN_USERNAME_LENGTH,
  USERNAME_REGEX,
} from '@/libs/constants/account.constants';

export const changeUsernameSchema = z.object({
  username: z.string().min(MIN_USERNAME_LENGTH).regex(USERNAME_REGEX),
});

export type ChangeUsernameSchema = z.infer<typeof changeUsernameSchema>;
