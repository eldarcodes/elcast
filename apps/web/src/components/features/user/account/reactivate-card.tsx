'use client';

import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import { CardContainer } from '@/components/ui/elements/card-container';
import { ConfirmModal } from '@/components/ui/elements/confirm-modal';

import { useReactivateAccountMutation } from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import { ACCOUNT_DAYS_UNTIL_DELETION } from '@/libs/constants/account.constants';

export function ReactivateCard() {
  const t = useTranslations('dashboard.settings.account.reactivation');

  const { user, refetch } = useCurrentProfile();

  const [reactivate, { loading: isLoadingReactivate }] =
    useReactivateAccountMutation({
      onCompleted: () => {
        refetch();

        toast.success(t('successMessage'));
      },
      onError: () => {
        toast.error(t('errorMessage'));
      },
    });

  const deactivationDate = dayjs(user?.deactivatedAt).add(
    ACCOUNT_DAYS_UNTIL_DELETION,
    'day',
  );

  return (
    <CardContainer
      heading={t('heading')}
      description={t('description', {
        relativeDate: deactivationDate.fromNow(),
      })}
      rightContent={
        <ConfirmModal
          heading={t('confirmModal.heading')}
          message={t('confirmModal.message')}
          onConfirm={() => reactivate()}
          disabled={isLoadingReactivate}
        >
          <Button>{t('button')}</Button>
        </ConfirmModal>
      }
    />
  );
}
