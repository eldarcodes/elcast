import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { AppearanceSettings } from '@/components/features/user/appearance/appearance-settings';

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('dashboard.settings.appearance.header');

  return {
    title: t('heading'),
    description: t('description'),
    ...NO_INDEX_PAGE,
  };
}

export default function DashboardSettingsAppearancePage() {
  return <AppearanceSettings />;
}
