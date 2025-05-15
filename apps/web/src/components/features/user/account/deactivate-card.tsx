'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/common/button';
import { CardContainer } from '@/components/ui/elements/card-container';
import { ConfirmModal } from '@/components/ui/elements/confirm-modal';

import { ACCOUNT_DAYS_UNTIL_DELETION } from '@/libs/constants/account.constants';

export function DeactivateCard() {
  const t = useTranslations('dashboard.settings.account.deactivation');

  const router = useRouter();

  return (
    <CardContainer
      heading={t('heading')}
      description={t('description', {
        deletionDays: ACCOUNT_DAYS_UNTIL_DELETION,
      })}
      rightContent={
        <ConfirmModal
          heading={t('confirmModal.heading')}
          variant="destructive"
          message={t('confirmModal.message', {
            deletionDays: ACCOUNT_DAYS_UNTIL_DELETION,
          })}
          onConfirm={() => router.push('/account/deactivate')}
        >
          <Button variant="destructive">{t('button')}</Button>
        </ConfirmModal>
      }
    />
  );
}
