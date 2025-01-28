'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import { CardContainer } from '@/components/ui/elements/card-container';
import { ConfirmModal } from '@/components/ui/elements/confirm-modal';

import {
  FindSessionsByUserQuery,
  useFindSessionsByUserQuery,
  useRemoveSessionMutation,
} from '@/graphql/generated/output';

import { getBrowserIcon } from '@/utils/get-browser-icon';

import { SessionModal } from './session-modal';

interface SessionItemProps {
  session: FindSessionsByUserQuery['findSessionsByUser'][0];
  isCurrentSession?: boolean;
}

export function SessionItem({ session, isCurrentSession }: SessionItemProps) {
  const t = useTranslations('dashboard.settings.sessions.sessionItem');

  const { refetch } = useFindSessionsByUserQuery();

  const [removeSession, { loading: isLoadingRemove }] =
    useRemoveSessionMutation({
      onCompleted: () => {
        toast.success(t('successMessage'));
        refetch();
      },
      onError: () => {
        toast.error(t('errorMessage'));
      },
    });

  if (!session || !session.metadata) return null;

  const Icon = getBrowserIcon(session.metadata.device.browser);

  return (
    <CardContainer
      heading={`${session.metadata.device.browser}, ${session.metadata.device.os}`}
      Icon={Icon}
      description={`${session.metadata.location.country}, ${session.metadata.location.city}`}
      rightContent={
        <div className="flex items-center gap-x-4">
          {!isCurrentSession && (
            <ConfirmModal
              heading={t('confirmModal.heading')}
              message={t('confirmModal.message')}
              onConfirm={() => removeSession({ variables: { id: session.id } })}
            >
              <Button variant="destructive" disabled={isLoadingRemove}>
                {t('deleteButton')}
              </Button>
            </ConfirmModal>
          )}
          <SessionModal session={session}>
            <Button>{t('detailsButton')}</Button>
          </SessionModal>
        </div>
      }
    />
  );
}
