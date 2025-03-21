import { Markup } from 'telegraf';

export const TELEGRAM_BUTTONS: Record<
  PropertyKey,
  ReturnType<typeof Markup.inlineKeyboard>
> = {
  authSuccess: Markup.inlineKeyboard([
    [
      Markup.button.callback('📋 My followings', 'follows'),
      Markup.button.callback('👤 Profile', 'me'),
    ],
    [Markup.button.url('🌐 Back on Elcast', 'https://elcast.eldarcodes.com')],
  ]),
  profile: Markup.inlineKeyboard([
    Markup.button.url(
      '⚙️ Settings',
      'https://elcast.eldarcodes.com/dashboard/settings',
    ),
  ]),
};
