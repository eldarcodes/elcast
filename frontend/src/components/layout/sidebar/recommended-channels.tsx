'use client';

import { useTranslations } from 'next-intl';

import { Separator } from '@/components/ui/common/separator';

import { useFindRecommendedChannelsQuery } from '@/graphql/generated/output';

import { useSidebar } from '@/hooks/use-sidebar';

import { ChannelItem } from './channel-item';

export function RecommendedChannels() {
  const t = useTranslations('layout.sidebar.recommended');

  const { data, loading: isLoadingRecommended } =
    useFindRecommendedChannelsQuery();

  const channels = data?.findRecommendedChannels ?? [];

  const { isCollapsed } = useSidebar();

  return (
    <div>
      <Separator className="mb-3" />

      {!isCollapsed && (
        <h2 className="mb-2 px-2 text-lg font-semibold text-foreground">
          {t('heading')}
        </h2>
      )}

      {isLoadingRecommended ? (
        <div>loading</div>
      ) : (
        channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} />
        ))
      )}
    </div>
  );
}
