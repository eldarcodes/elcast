'use client';

import { useTranslations } from 'next-intl';

export function LiveBadge() {
  const t = useTranslations('components.liveBadge');

  return (
    <div className="rounded-full bg-red-500 p-0.5 px-2 text-center text-xs font-semibold uppercase tracking-wide text-white">
      {t('text')}
    </div>
  );
}
