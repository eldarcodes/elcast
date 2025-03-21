import parse from 'html-react-parser';

import type { FindNotificationsByUserQuery } from '@/graphql/generated/output';

import { getNotificationIcon } from '@/utils/get-notification-icon';

interface NotificationsItemProps {
  notification: FindNotificationsByUserQuery['findNotificationsByUser'][0];
}

export function NotificationsItem({ notification }: NotificationsItemProps) {
  const Icon = getNotificationIcon(notification.type);

  return (
    <div className="flex items-center gap-x-3 text-sm">
      <div className="rounded-full">
        <Icon className="size-6" />
      </div>

      <div>{parse(notification.message)}</div>
    </div>
  );
}
