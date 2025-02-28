import { z } from 'zod';

import { MAX_BIO_LENGTH } from '@/libs/constants/account.constants';

export const changeInfoSchema = z.object({
  displayName: z.string().min(1),
  bio: z.string().max(MAX_BIO_LENGTH),
});

export type ChangeInfoSchema = z.infer<typeof changeInfoSchema>;
