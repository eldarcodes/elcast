'use server';

import { cookies } from 'next/headers';

import { COOKIE_NAME, defaultLocale, type Locale } from './config';

export async function getCurrentLocale() {
  const cookiesStore = await cookies();

  const cookieLanguage = cookiesStore.get(COOKIE_NAME)?.value;

  return cookieLanguage ?? defaultLocale;
}

export async function sendLanguage(locale: Locale) {
  const cookiesStore = await cookies();

  return cookiesStore.set(COOKIE_NAME, locale);
}
