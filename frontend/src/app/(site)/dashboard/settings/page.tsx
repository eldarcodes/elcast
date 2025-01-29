import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { UserSettings } from '@/components/features/user/user-settings';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('dashboard.settings.header');

  return {
    title: t('heading'),
    description: t('description'),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function DashboardSettingsPage() {
  return <UserSettings />;
}
