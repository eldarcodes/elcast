import { z } from 'zod';

export const verifyAccountCodeSchema = z.object({
  code: z.string(),
});

export type VerifyAccountCodeSchema = z.infer<typeof verifyAccountCodeSchema>;
