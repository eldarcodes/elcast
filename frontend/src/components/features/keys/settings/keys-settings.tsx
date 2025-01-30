'use client';

import { useTranslations } from 'next-intl';

import { Heading } from '@/components/ui/elements/heading';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import { CreateIngressForm } from './forms/create-ingress-form';
import { InstructionModal } from './instruction-modal';

export function KeysSettings() {
  const t = useTranslations('dashboard.keys.header');

  const { user, isLoadingProfile } = useCurrentProfile();

  return (
    <div className="lg:px-10">
      <div className="block items-center justify-between space-y-3 lg:flex lg:space-y-0">
        <Heading
          title={t('heading')}
          description={t('description')}
          size="lg"
        />

        <div className="flex items-center gap-x-4">
          <InstructionModal />
          <CreateIngressForm />
        </div>
      </div>
    </div>
  );
}
