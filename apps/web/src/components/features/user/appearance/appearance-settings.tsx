'use client';

import { useTranslations } from 'next-intl';

import { Heading } from '@/components/ui/elements/heading';

import { ChangeLocaleForm } from './change-locale-form';
import { ChangeThemeForm } from './change-theme-form';

export function AppearanceSettings() {
  const t = useTranslations('dashboard.settings.appearance.header');

  return (
    <div className="lg:px-10">
      <Heading title={t('heading')} description={t('description')} size="lg" />

      <div className="mt-5 space-y-6">
        <ChangeThemeForm />
        <ChangeLocaleForm />
      </div>
    </div>
  );
}
