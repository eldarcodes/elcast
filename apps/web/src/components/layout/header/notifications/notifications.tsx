import { Inbox } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/common/popover';

import {
  FindNotificationsByUserQuery,
  useFindNotificationsByUserQuery,
  useFindNotificationsUnreadCountQuery,
  useNotificationAddedSubscription,
} from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import { NotificationsItem } from './notifications-item';
import { NotificationsList } from './notifications-list';

export function Notifications() {
  const { user } = useCurrentProfile();

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

      toast(<NotificationsItem notification={newNotification} />);
    }
  }, [newNotificationData]);

  const count = notificationsCount?.findNotificationsUnreadCount ?? 0;

  const displayCount = count > 10 ? '+9' : count;

  if (isLoadingCount) return null;

  return (
    <Popover>
      <PopoverTrigger>
        {count > 0 && (
          <div className="absolute right-[60px] top-[17px] min-w-5 rounded-full bg-red-500 px-[5px] text-xs font-semibold text-white">
            {displayCount}
          </div>
        )}
        <Inbox className="size-5 text-foreground" />
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="max-h-[500px] w-[320px] overflow-y-auto"
      >
        <NotificationsList
          notifications={notifications}
          loading={isLoadingNotifications}
        />
      </PopoverContent>
    </Popover>
  );
}
