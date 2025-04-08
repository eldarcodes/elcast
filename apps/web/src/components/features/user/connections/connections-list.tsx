'use client';

import { CircleCheck, CircleX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';

import { useGetOAuthConnectionsQuery } from '@/graphql/generated/output';

import { SERVER_URL } from '@/libs/constants/url.constants';

import { cn } from '@/utils/tw-merge';

export function ConnectionsList() {
  const t = useTranslations('dashboard.settings.connections');
  const { data } = useGetOAuthConnectionsQuery({});

  const router = useRouter();

  const connections = data?.getOAuthConnections ?? [];

  const connectionsConfig = [
    {
      id: 'google',
      name: 'Google',
      icon: FaGoogle,
      enabled: connections.some(
        (connection) => connection.provider === 'google',
      ),
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: FaGithub,
      enabled: connections.some(
        (connection) => connection.provider === 'github',
      ),
    },
  ];

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
      {connectionsConfig.map(({ id, name, enabled, icon: Icon }) => (
        <div key={id} className={'flex items-center gap-x-4 p-6'}>
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
              size="sm"
              onClick={enabled ? () => null : () => onConnect(id)}
            >
              {enabled ? t('disconnect') : t('connect')}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
