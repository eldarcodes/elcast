import { Inbox } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/common/popover';
import { Hint } from '@/components/ui/elements/hint';

import {
  FindNotificationsByUserQuery,
  useFindNotificationsByUserQuery,
  useFindNotificationsUnreadCountQuery,
  useNotificationAddedSubscription,
} from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import { NotificationsList } from './notifications-list';
import { NotificationsToast } from './notifications-toast';

export function Notifications() {
  const [open, setOpen] = useState(false);

  const { user } = useCurrentProfile();
  const t = useTranslations(
    'layout.header.headerMenu.profileMenu.notifications',
  );

  const {
    data: notificationsCount,
    loading: isLoadingCount,
    refetch: refetchCount,
  } = useFindNotificationsUnreadCountQuery();

  const { data: notificationsData, loading: isLoadingNotifications } =
    useFindNotificationsByUserQuery();

  const { data: newNotificationData } = useNotificationAddedSubscription({
    variables: {
      userId: user?.id ?? '',
    },
  });

  const [notifications, setNotifications] = useState<
    FindNotificationsByUserQuery['findNotificationsByUser']
  >([]);

  useEffect(() => {
    if (notificationsData && notificationsData.findNotificationsByUser) {
      setNotifications(notificationsData.findNotificationsByUser ?? []);
    }
  }, [notificationsData]);

  useEffect(() => {
    if (newNotificationData) {
      const newNotification = newNotificationData.notificationAdded;

      refetchCount();
      setNotifications((prev) => [newNotification, ...prev]);

      toast(<NotificationsToast notification={newNotification} />);
    }
  }, [newNotificationData]);

  const unreadCount = notificationsCount?.findNotificationsUnreadCount ?? 0;

  const displayCount = unreadCount > 10 ? '+9' : unreadCount;

  if (isLoadingCount) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Hint label={t('heading')} asChild>
          <Button size="icon" variant="ghost" className="relative">
            {unreadCount > 0 && (
              <div className="absolute right-[-7px] top-[-3px] min-w-5 rounded-full bg-red-500 px-[5px] text-xs font-semibold text-white">
                {displayCount}
              </div>
            )}
            <Inbox />
          </Button>
        </Hint>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="max-h-[500px] w-screen overflow-y-auto p-0 md:w-[350px]"
      >
        <NotificationsList
          notifications={notifications}
          loading={isLoadingNotifications}
          onClose={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
