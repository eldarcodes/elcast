import { z } from 'zod';

export const changeChatSettingsSchema = z.object({
  isChatEnabled: z.boolean(),
  isChatFollowersOnly: z.boolean(),
  isChatSubscribersOnly: z.boolean(),
});

export type ChangeChatSettingsSchema = z.infer<typeof changeChatSettingsSchema>;
