'use client';

import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/common/button';

import { useCurrentProfile } from '@/hooks/use-current-profile';
import { useLayout } from '@/hooks/use-layout';

import { ACCOUNT_DAYS_UNTIL_DELETION } from '@/libs/constants/account.constants';

export function DeactivationAlert() {
  const {
    closeDeactivationAlert,
    openDeactivationAlert,
    isVisibleDeactivationAlert,
  } = useLayout();

  const { user } = useCurrentProfile();

  useEffect(() => {
    if (user?.isDeactivated) {
      openDeactivationAlert();
    }
  }, [user]);

  if (!isVisibleDeactivationAlert) return null;
  if (!user?.isDeactivated) return null;

  const deactivationDate = dayjs(user.deactivatedAt).add(
    ACCOUNT_DAYS_UNTIL_DELETION,
    'day',
  );

  return (
    <div className="relative h-[30px] w-full bg-red-600 p-4">
      <div className="flex h-full items-center justify-center text-xs">
        Your account is scheduled for deletion {deactivationDate.fromNow()}.
        <span className="ml-1 hidden sm:inline">
          ({deactivationDate.format('DD.MM.YYYY')})
        </span>
      </div>
      <div className="absolute right-1 top-1/2 h-6 -translate-y-1/2">
        <Button
          size="iconSm"
          variant="ghost"
          className="h-6 w-6 hover:bg-accent/30"
          onClick={closeDeactivationAlert}
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  );
}
