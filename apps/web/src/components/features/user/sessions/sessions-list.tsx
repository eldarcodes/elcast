'use client';

import { useTranslations } from 'next-intl';

import { Heading } from '@/components/ui/elements/heading';
import { ToggleCardSkeleton } from '@/components/ui/elements/toggle-card';

import {
  useFindCurrentSessionQuery,
  useFindSessionsByUserQuery,
} from '@/graphql/generated/output';

import { SessionItem } from './session-item';

export function SessionsList() {
  const t = useTranslations('dashboard.settings.sessions');

  const { data: sessionData, loading: isLoadingCurrentSession } =
    useFindCurrentSessionQuery();

  const { data: sessionsData, loading: isLoadingSessions } =
    useFindSessionsByUserQuery({
      pollInterval: 10000,
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
        <Heading title={t('info.active')} size="sm" />

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
