import { useTranslations } from 'next-intl';

import { Skeleton } from '@/components/ui/common/skeleton';
import { CardContainer } from '@/components/ui/elements/card-container';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import { DisableTotp } from './disable-totp';
import { EnableTotp } from './enable-totp';

export function WrapperTotp() {
  const t = useTranslations('dashboard.settings.account.twoFactor');

  const { user, isLoadingProfile } = useCurrentProfile();

  if (isLoadingProfile) {
    return <WrapperTotpSkeleton />;
  }

  return (
    <CardContainer
      heading={t('heading')}
      description={t('description')}
      rightContent={!user?.isTotpEnabled ? <EnableTotp /> : <DisableTotp />}
    />
  );
}

export function WrapperTotpSkeleton() {
  return <Skeleton className="h-24 w-full" />;
}
