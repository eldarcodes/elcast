import { Ghost, Loader, MailOpen, Settings, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Fragment } from 'react';

import { Button } from '@/components/ui/common/button';
import { Separator } from '@/components/ui/common/separator';

import {
  FindNotificationsByUserQuery,
  useFindNotificationsByUserQuery,
  useFindNotificationsUnreadCountQuery,
  useMarkNotificationsAsReadMutation,
} from '@/graphql/generated/output';

import { NotificationsItem } from './notifications-item';

interface NotificationsListProps {
  notifications: FindNotificationsByUserQuery['findNotificationsByUser'];
  loading: boolean;
  onClose: () => void;
}

export function NotificationsList({
  notifications,
  loading,
  onClose,
}: NotificationsListProps) {
  const t = useTranslations(
    'layout.header.headerMenu.profileMenu.notifications',
  );

  const { refetch: refetchNotifications } = useFindNotificationsByUserQuery();
  const { data: notificationsCount, refetch: refetchCount } =
    useFindNotificationsUnreadCountQuery();

  const unreadCount = notificationsCount?.findNotificationsUnreadCount ?? 0;

  const [markAllAsRead] = useMarkNotificationsAsReadMutation({
    onCompleted: () => {
      refetchNotifications();
      refetchCount();
    },
  });

  let body = null;

  if (loading) {
    body = (
      <div className="my-14 flex items-center justify-center gap-x-2 text-sm text-foreground">
        <Loader className="size-5 animate-spin" />
        {t('loading')}
      </div>
    );
  } else if (notifications.length) {
    body = notifications.map((notification, index) => {
      return (
        <Fragment key={notification.id}>
          <NotificationsItem notification={notification} />
          {index < notifications.length - 1 && <Separator />}
        </Fragment>
      );
    });
  } else {
    body = (
      <div className="px-3 py-8 text-center text-muted-foreground">
        <Ghost className="mx-auto mb-2 size-12" />
        {t('empty')}
      </div>
    );
  }

  return (
    <>
      <div className="relative flex items-center justify-between border-b p-3">
        {unreadCount > 0 && (
          <div>
            <Button
              size="iconSm"
              variant="ghost"
              onClick={() => markAllAsRead()}
            >
              <MailOpen className="size-5" />
            </Button>
          </div>
        )}

        <h3 className="text-md absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium">
          {t('heading')}
        </h3>

        <div className="ml-auto flex items-center gap-x-2">
          <Link
            href="/dashboard/settings?tab=notifications"
            className="leading-none"
          >
            <Button size="iconSm" variant="ghost">
              <Settings className="size-5" />
            </Button>
          </Link>

          <Button size="iconSm" variant="ghost" onClick={() => onClose()}>
            <X className="size-5" />
          </Button>
        </div>
      </div>

      {body}
    </>
  );
}
