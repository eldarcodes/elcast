'use client';

import { useTranslations } from 'next-intl';

import { Heading } from '@/components/ui/elements/heading';

import { ChangeChatSettingsForm } from './forms/change-chat-settings-form';

export function ChatSettings() {
  const t = useTranslations('dashboard.chat');

  return (
    <div className="lg:px-10">
      <Heading
        title={t('header.heading')}
        description={t('header.description')}
        size="lg"
      />

      <div className="mt-5 space-y-6">
        <ChangeChatSettingsForm />
      </div>
    </div>
  );
}
