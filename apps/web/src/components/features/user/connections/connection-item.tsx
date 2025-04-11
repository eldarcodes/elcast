'use client';

import dayjs from 'dayjs';
import { CircleCheck, CircleX, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';

import {
  useDisconnectOAuthConnectionMutation,
  useGetOAuthConnectionsQuery,
} from '@/graphql/generated/output';

import { SERVER_URL } from '@/libs/constants/url.constants';

import { cn } from '@/utils/tw-merge';

import { connectionsConfig } from './connections-list';

interface ConnectionItemProps {
  connection: {
    provider: string;
    providerId?: string;
    createdAt?: string;
    email?: string | null;
  };
  enabled: boolean;
}

export function ConnectionItem({ connection, enabled }: ConnectionItemProps) {
  const t = useTranslations('dashboard.settings.connections');

  const router = useRouter();

  const { refetch } = useGetOAuthConnectionsQuery({});

  const [disconnect, { loading: isLoadingDisconnect }] =
    useDisconnectOAuthConnectionMutation();

  const { provider, createdAt, email } = connection;

  const connectionConfig = connectionsConfig.find(
    (config) => config.provider === provider,
  );

  if (!connectionConfig) {
    return null;
  }

  const { icon: Icon, name } = connectionConfig;

  const onDisconnect = async (provider: string, providerId: string) => {
    disconnect({
      variables: {
        provider,
        providerId,
      },
      onCompleted: () => {
        toast.success(t('disconnectSuccessMessage', { service: provider }));

        refetch();
      },
      onError: () => {
        toast.error(t('disconnectErrorMessage', { service: provider }));
      },
    });
  };

  const onConnect = async (provider: string) => {
    const { origin: serverOrigin } = new URL(SERVER_URL);

    const response = await fetch(`${serverOrigin}/oauth/connect/${provider}`);

    if (!response.ok) {
      toast.error('Failed to sign in. Please try again later.');
      return;
    }

    const data = await response.json();

    if (data.url) {
      router.push(data.url);
    }
  };

  return (
    <div key={provider} className={'flex items-center gap-x-4 p-6'}>
      <div className="h-30 w-30 hidden items-center justify-center rounded bg-gray-200 p-4 sm:flex">
        <Icon className="size-8" />
      </div>

      <div className="block w-full items-center justify-between sm:flex">
        <div className={cn('flex flex-col gap-y-1', !enabled && 'opacity-50')}>
          <p className="font-semibold">{name}</p>

          {email && <p className="text-sm text-gray-500">{email}</p>}

          <div className="flex items-center gap-x-1 text-sm">
            {enabled ? (
              <>
                <CircleCheck className="size-4 text-green-500" />
                {t('connected', { service: name })}
              </>
            ) : (
              <>
                <CircleX className="size-4 text-red-500" />
                {t('notConnected', { service: name })}
              </>
            )}

            {createdAt && (
              <div className="hidden text-sm text-gray-500 sm:block">
                ({dayjs(createdAt).format('DD.MM.YYYY')})
              </div>
            )}
          </div>
        </div>

        <Button
          type="button"
          variant={enabled ? 'secondary' : 'default'}
          disabled={isLoadingDisconnect}
          className="mt-2 sm:mt-0"
          size="sm"
          onClick={
            enabled
              ? () => onDisconnect(provider, connection.providerId!)
              : () => onConnect(provider)
          }
        >
          {isLoadingDisconnect && <Loader2 className="size-4 animate-spin" />}
          {enabled ? t('disconnect') : t('connect')}
        </Button>
      </div>
    </div>
  );
}
