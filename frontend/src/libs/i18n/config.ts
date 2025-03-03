export const COOKIE_NAME = 'locale';

export const languageOptions = {
  en: 'English',
  ru: 'Русский',
};

export const locales = ['en', 'ru'] as const;

export const defaultLocale: Locale = 'en';

export type Locale = (typeof locales)[number];
