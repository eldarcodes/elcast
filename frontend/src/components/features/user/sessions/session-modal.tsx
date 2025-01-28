'use client';

import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/common/dialog';

import { FindSessionsByUserQuery } from '@/graphql/generated/output';

interface SessionModalProps {
  session: FindSessionsByUserQuery['findSessionsByUser'][0];
}

export function SessionModal({
  session,
  children,
}: React.PropsWithChildren<SessionModalProps>) {
  const t = useTranslations('dashboard.settings.sessions.sessionModal');

  if (!session || !session.metadata) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-xl">{t('heading')}</DialogTitle>
        <div className="space-y-3">
          <div className="flex items-center">
            <span className="font-medium">{t('device')}</span>
            <span className="ml-2 text-muted-foreground">
              {session.metadata.device.browser}
              {', '}
              {session.metadata.device.os}
            </span>
          </div>

          <div className="flex items-center">
            <span className="font-medium">{t('location')}</span>
            <span className="ml-2 text-muted-foreground">
              {session.metadata.location.country}
              {', '}
              {session.metadata.location.city}
            </span>
          </div>

          <div className="flex items-center">
            <span className="font-medium">{t('ipAddress')}</span>
            <span className="ml-2 text-muted-foreground">
              {session.metadata.ip}
            </span>
          </div>

          <div className="flex items-center">
            <span className="font-medium">{t('createdAt')}</span>
            <span className="ml-2 text-muted-foreground">
              {dayjs(session.createdAt).format('DD MMMM YYYY, HH:mm')}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
