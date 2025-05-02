import parse from 'html-react-parser';

import { FindNotificationsByUserQuery } from '@/graphql/generated/output';

import { getNotificationIcon } from '@/utils/get-notification-icon';

interface NotificationsToastProps {
  notification: FindNotificationsByUserQuery['findNotificationsByUser'][0];
}

export function NotificationsToast({ notification }: NotificationsToastProps) {
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
