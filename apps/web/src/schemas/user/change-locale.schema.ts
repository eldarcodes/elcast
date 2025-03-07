import { z } from 'zod';

import { locales } from '@/libs/i18n/config';

export const changeLocaleSchema = z.object({
  locale: z.enum(locales),
});

export type ChangeLocaleSchema = z.infer<typeof changeLocaleSchema>;
