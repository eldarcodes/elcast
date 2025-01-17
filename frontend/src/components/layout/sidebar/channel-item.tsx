'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/common/button';
import { Skeleton } from '@/components/ui/common/skeleton';
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar';
import { ChannelVerified } from '@/components/ui/elements/channel-verified';
import { Hint } from '@/components/ui/elements/hint';
import { LiveBadge } from '@/components/ui/elements/live-badge';

import { type FindRecommendedChannelsQuery } from '@/graphql/generated/output';

import { useSidebar } from '@/hooks/use-sidebar';

import { cn } from '@/utils/tw-merge';

interface ChannelItemProps {
  channel: FindRecommendedChannelsQuery['findRecommendedChannels'][0];
}

export function ChannelItem({ channel }: ChannelItemProps) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  const isActive = pathname === `/${channel.username}`;

  return isCollapsed ? (
    <Hint label={channel.username} side="right" asChild>
      <Link
        href={`/${channel.username}`}
        className="mt-3 flex w-full items-center justify-center"
      >
        <ChannelAvatar channel={channel} isLive={channel.stream.isLive} />
      </Link>
    </Hint>
  ) : (
    <Button
      className={cn('mt-1 h-11 w-full justify-start', isActive && 'bg-accent')}
      variant="ghost"
      asChild
    >
      <Link href={`/${channel.username}`} className="flex w-full items-center">
        <ChannelAvatar
          size="sm"
          channel={channel}
          isLive={channel.stream.isLive}
        />
        <div className="flex items-center gap-0">
          <h2 className="truncate px-1">{channel.username}</h2>
          {channel.isVerified && <ChannelVerified size="sm" />}
        </div>
        {!channel.stream.isLive && (
          <div className="absolute right-5">
            <LiveBadge />
          </div>
        )}
      </Link>
    </Button>
  );
}

export function ChannelItemSkeleton() {
  return <Skeleton className="mt-1 h-11 w-full px-4 py-2" />;
}
