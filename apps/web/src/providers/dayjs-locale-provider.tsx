'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import { useLocale } from 'next-intl';

export function DayjsLocaleProvider() {
  const locale = useLocale();

  dayjs.locale(locale);

  return null;
}
