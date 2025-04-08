'use client';

import { CircleCheck, CircleX, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';

import {
  useDisconnectOAuthConnectionMutation,
  useGetOAuthConnectionsQuery,
} from '@/graphql/generated/output';

import { SERVER_URL } from '@/libs/constants/url.constants';

import { cn } from '@/utils/tw-merge';

export function ConnectionsList() {
  const t = useTranslations('dashboard.settings.connections');
  const { data, refetch } = useGetOAuthConnectionsQuery({});

  const [disconnect, { loading: isLoadingDisconnect }] =
    useDisconnectOAuthConnectionMutation();

  const router = useRouter();

  const connections = data?.getOAuthConnections ?? [];

  const connectionsConfig = [
    {
      provider: 'google',
      name: 'Google',
      icon: FaGoogle,
    },
    {
      provider: 'github',
      name: 'GitHub',
      icon: FaGithub,
    },
  ];

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
    <div className="divide-y rounded border">
      {connectionsConfig.map(({ provider, name, icon: Icon }) => {
        const connection = connections.find(
          (connection) => connection.provider === provider,
        );

        const enabled = !!connection?.id;

        return (
          <div key={provider} className={'flex items-center gap-x-4 p-6'}>
            <div className="h-30 w-30 rounded bg-gray-200 p-4">
              <Icon className="size-8" />
            </div>

            <div className="flex w-full items-center justify-between">
              <div className={cn(!enabled && 'opacity-50')}>
                <p className="mb-1 font-semibold">{name}</p>

                {enabled ? (
                  <div className="flex items-center gap-x-1 text-sm">
                    <CircleCheck className="size-4 text-green-500" />
                    {t('connected', { service: name })}
                  </div>
                ) : (
                  <div className="flex items-center gap-x-1 text-sm">
                    <CircleX className="size-4 text-red-500" />
                    {t('notConnected', { service: name })}
                  </div>
                )}
              </div>

              <Button
                type="button"
                variant={enabled ? 'secondary' : 'default'}
                disabled={isLoadingDisconnect}
                size="sm"
                onClick={
                  enabled
                    ? () => onDisconnect(provider, connection.providerId)
                    : () => onConnect(provider)
                }
              >
                {isLoadingDisconnect && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                {enabled ? t('disconnect') : t('connect')}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
