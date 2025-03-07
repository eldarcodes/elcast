import { z } from 'zod';

export const socialLinksSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

export type SocialLinksSchema = z.infer<typeof socialLinksSchema>;
