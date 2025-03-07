import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import { ConfirmModal } from '@/components/ui/elements/confirm-modal';

import { useDisableTotpMutation } from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

export function DisableTotp() {
  const t = useTranslations('dashboard.settings.account.twoFactor.disable');

  const { refetch } = useCurrentProfile();

  const [disableTotp, { loading: isLoadingDisable }] = useDisableTotpMutation({
    onCompleted: () => {
      refetch();
      toast.success(t('successMessage'));
    },
    onError: () => {
      toast.error(t('errorMessage'));
    },
  });

  return (
    <ConfirmModal
      heading={t('heading')}
      message={t('message')}
      onConfirm={() => disableTotp()}
    >
      <Button variant="secondary" disabled={isLoadingDisable}>
        {t('trigger')}
      </Button>
    </ConfirmModal>
  );
}
