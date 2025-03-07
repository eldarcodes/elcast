import { z } from 'zod';

export const changeNotificationsSchema = z.object({
  siteNotifications: z.boolean(),
  telegramNotifications: z.boolean(),
});

export type ChangeNotificationsSchema = z.infer<
  typeof changeNotificationsSchema
>;
