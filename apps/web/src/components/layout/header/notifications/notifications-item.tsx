import parse from 'html-react-parser';
import { MailOpen, X } from 'lucide-react';

import { Badge } from '@/components/ui/common/badge';
import { Button } from '@/components/ui/common/button';

import {
  FindNotificationsByUserQuery,
  useDeleteNotificationMutation,
  useFindNotificationsByUserQuery,
  useFindNotificationsUnreadCountQuery,
  useMarkNotificationAsReadMutation,
} from '@/graphql/generated/output';

import { getRelativeTime } from '@/utils/date';
import { getNotificationIcon } from '@/utils/get-notification-icon';

interface NotificationsItemProps {
  notification: FindNotificationsByUserQuery['findNotificationsByUser'][0];
}

export function NotificationsItem({ notification }: NotificationsItemProps) {
  const Icon = getNotificationIcon(notification.type);

  const { refetch: refetchNotifications } = useFindNotificationsByUserQuery();
  const { refetch: refetchCount } = useFindNotificationsUnreadCountQuery();

  const [markAsRead, { loading: isLoadingRead }] =
    useMarkNotificationAsReadMutation({
      variables: {
        notificationId: notification.id,
      },
      onCompleted: () => {
        refetchNotifications();
        refetchCount();
      },
    });

  const [deleteNotification, { loading: isLoadingDelete }] =
    useDeleteNotificationMutation({
      variables: {
        notificationId: notification.id,
      },
      onCompleted: () => {
        refetchNotifications();
        refetchCount();
      },
    });

  return (
    <div className="group relative flex cursor-pointer items-center gap-x-3 p-3 hover:bg-secondary">
      <div className="rounded-full">
        <Icon className="size-8" />
      </div>

      <div>
        <div className="text-sm">{parse(notification.message)}</div>
        <div className="flex items-center gap-x-2">
          <div className="text-sm text-foreground/50">
            {getRelativeTime(notification.createdAt)}
          </div>

          {!notification.isRead && (
            <Badge variant="default" className="px-1 py-0 text-[8px]">
              NEW
            </Badge>
          )}
        </div>
      </div>

      <div className="absolute right-2 top-2 hidden group-hover:block">
        <div className="flex items-center">
          {notification.isRead ? (
            <Button
              size="iconSm"
              variant="ghost"
              disabled={isLoadingDelete}
              onClick={() => deleteNotification()}
            >
              <X className="size-4" />
            </Button>
          ) : (
            <Button
              size="iconSm"
              variant="ghost"
              disabled={isLoadingRead}
              onClick={() => markAsRead()}
            >
              <MailOpen className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
