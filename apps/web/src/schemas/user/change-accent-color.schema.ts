import { z } from 'zod';

export const changeAccentColorSchema = z.object({
  accentColor: z.string().regex(/^#[A-Fa-f0-9]{6}$/, {
    message: 'Invalid hex color format',
  }),
});

export type ChangeAccentColorSchema = z.infer<typeof changeAccentColorSchema>;
