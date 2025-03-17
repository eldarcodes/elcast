import { Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Fragment, useEffect } from 'react';

import { Separator } from '@/components/ui/common/separator';

import {
  FindNotificationsByUserQuery,
  useFindNotificationsUnreadCountQuery,
  useMarkNotificationsAsReadMutation,
} from '@/graphql/generated/output';

import { NotificationsItem } from './notifications-item';

interface NotificationsListProps {
  notifications: FindNotificationsByUserQuery['findNotificationsByUser'];
  loading: boolean;
}

export function NotificationsList({
  notifications,
  loading,
}: NotificationsListProps) {
  const t = useTranslations(
    'layout.header.headerMenu.profileMenu.notifications',
  );

  const { refetch: refetchCount } = useFindNotificationsUnreadCountQuery();

  const [markAsRead] = useMarkNotificationsAsReadMutation({
    onCompleted: () => {
      refetchCount();
    },
  });

  useEffect(() => {
    markAsRead();
  }, []);

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
          {index < notifications.length - 1 && <Separator className="my-3" />}
        </Fragment>
      );
    });
  } else {
    body = (
      <div className="text-center text-muted-foreground">{t('empty')}</div>
    );
  }

  return (
    <>
      <h2 className="text-center text-lg font-medium">{t('heading')}</h2>

      <Separator className="my-3" />

      {body}
    </>
  );
}
