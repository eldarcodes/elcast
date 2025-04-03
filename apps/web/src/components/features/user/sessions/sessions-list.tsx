'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import { ConfirmModal } from '@/components/ui/elements/confirm-modal';
import { Heading } from '@/components/ui/elements/heading';
import { ToggleCardSkeleton } from '@/components/ui/elements/toggle-card';

import {
  useFindCurrentSessionQuery,
  useFindSessionsByUserQuery,
  useRemoveAllOtherSessionsMutation,
} from '@/graphql/generated/output';

import { SessionItem } from './session-item';

export function SessionsList() {
  const t = useTranslations('dashboard.settings.sessions');

  const { data: sessionData, loading: isLoadingCurrentSession } =
    useFindCurrentSessionQuery();

  const {
    data: sessionsData,
    loading: isLoadingSessions,
    refetch: refetchSessions,
  } = useFindSessionsByUserQuery({
    pollInterval: 10000,
  });

  const [removeAllOtherSessions, { loading: isLoadingRemoveAll }] =
    useRemoveAllOtherSessionsMutation({
      onCompleted: () => {
        toast.success(t('removeOtherSessions.successMessage'));

        refetchSessions();
      },
      onError: () => {
        toast.error(t('removeOtherSessions.errorMessage'));
      },
    });

  const currentSession = sessionData?.findCurrentSession;
  const sessions = sessionsData?.findSessionsByUser ?? [];

  return (
    <>
      {currentSession && (
        <div className="space-y-4">
          <Heading title={t('info.current')} size="sm" />

          {isLoadingCurrentSession ? (
            <ToggleCardSkeleton />
          ) : (
            <SessionItem session={currentSession} isCurrentSession />
          )}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Heading title={t('info.active')} size="sm" />

          {!!sessions.length && (
            <ConfirmModal
              heading={t('removeOtherSessions.heading')}
              message={t('removeOtherSessions.message')}
              onConfirm={() => removeAllOtherSessions()}
            >
              <Button variant="destructive" disabled={isLoadingRemoveAll}>
                {t('removeOtherSessions.button')}
              </Button>
            </ConfirmModal>
          )}
        </div>

        {isLoadingSessions ? (
          Array.from({ length: 5 }).map((_, index) => (
            <ToggleCardSkeleton key={index} />
          ))
        ) : sessions.length ? (
          sessions.map((session) => (
            <SessionItem key={session.id} session={session} />
          ))
        ) : (
          <div className="text-muted-foreground">{t('info.notFound')}</div>
        )}
      </div>
    </>
  );
}
