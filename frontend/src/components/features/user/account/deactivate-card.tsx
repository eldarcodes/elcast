'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/common/button';
import { CardContainer } from '@/components/ui/elements/card-container';
import { ConfirmModal } from '@/components/ui/elements/confirm-modal';

export function DeactivateCard() {
  const t = useTranslations('dashboard.settings.account.deactivation');

  const router = useRouter();

  return (
    <CardContainer
      heading={t('heading')}
      description={t('description')}
      rightContent={
        <div className="flex items-center gap-x-4">
          <ConfirmModal
            heading={t('confirmModal.heading')}
            message={t('confirmModal.message')}
            onConfirm={() => router.push('/account/deactivate')}
          >
            <Button variant="destructive">{t('button')}</Button>
          </ConfirmModal>
        </div>
      }
    />
  );
}
