'use client';

import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/common/button';

import { useCurrentProfile } from '@/hooks/use-current-profile';
import { useLayout } from '@/hooks/use-layout';

import { ACCOUNT_DAYS_UNTIL_DELETION } from '@/libs/constants/account.constants';

interface DeactivationAlertMessageProps {
  deactivatedAt: string;
}

export const DeactivationAlertMessage = ({
  deactivatedAt,
}: DeactivationAlertMessageProps) => {
  const t = useTranslations('layout.header.deactivationAlert');

  const deactivationDate = dayjs(deactivatedAt).add(
    ACCOUNT_DAYS_UNTIL_DELETION,
    'day',
  );

  return (
    <div className="flex h-full items-center justify-center text-xs text-white">
      <span className="hidden md:inline">
        {t.rich('message', {
          relativeDate: deactivationDate.fromNow(),
          date: deactivationDate.format('DD.MM.YYYY'),
          link: (chunks) => (
            <Link
              href="/dashboard/settings?tab=security"
              className="underline hover:no-underline"
            >
              {chunks}
            </Link>
          ),
        })}
      </span>

      <span className="md:hidden">
        {t('messageShort', {
          relativeDate: deactivationDate.fromNow(),
        })}
      </span>
    </div>
  );
};

export function DeactivationAlert() {
  const {
    closeDeactivationAlert,
    openDeactivationAlert,
    isVisibleDeactivationAlert,
  } = useLayout();

  const { user } = useCurrentProfile();

  useEffect(() => {
    if (!user) {
      closeDeactivationAlert();
      return;
    }

    if (user?.isDeactivated) {
      openDeactivationAlert();
    } else {
      closeDeactivationAlert();
    }
  }, [user]);

  if (!isVisibleDeactivationAlert) return null;
  if (!user?.isDeactivated) return null;

  return (
    <div className="relative h-[30px] w-full bg-red-600 p-4">
      <DeactivationAlertMessage deactivatedAt={user.deactivatedAt} />

      <div className="absolute right-1 top-1/2 h-6 -translate-y-1/2">
        <Button
          size="iconSm"
          variant="ghost"
          className="h-6 w-6 hover:bg-accent/30"
          onClick={closeDeactivationAlert}
        >
          <X className="size-4 text-white" />
        </Button>
      </div>
    </div>
  );
}
