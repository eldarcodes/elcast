import { getRequestConfig } from 'next-intl/server';

import { getCurrentLocale } from './locale';

export default getRequestConfig(async () => {
  const locale = await getCurrentLocale();

  return {
    locale,
    messages: (await import(`../../../public/locales/${locale}.json`)).default,
  };
});
