'use client';

import { useTranslations } from 'next-intl';

import { Heading } from '@/components/ui/elements/heading';

export function ConnectionsSettings() {
  const t = useTranslations('dashboard.settings.connections.header');

  return (
    <div className="lg:px-10">
      <Heading title={t('heading')} description={t('description')} size="lg" />

      <div className="mt-5 space-y-6">content</div>
    </div>
  );
}
