'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Card } from '@/components/ui/common/card';
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar';
import { LiveBadge } from '@/components/ui/elements/live-badge';

import type { FindProfileQuery } from '@/graphql/generated/output';

import { getMediaSource } from '@/utils/get-media-source';
import { cn } from '@/utils/tw-merge';

interface StreamThumbnailProps {
  url: string | null | undefined;
  user: Pick<
    FindProfileQuery['findProfile'],
    'id' | 'username' | 'avatar' | 'isVerified' | 'displayName' | 'accentColor'
  >;
  isLive?: boolean;
}

export function StreamThumbnail({ url, user, isLive }: StreamThumbnailProps) {
  return (
    <div className="group relative aspect-video cursor-pointer rounded">
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center rounded opacity-0 transition-opacity group-hover:opacity-100',
          !user.accentColor && 'bg-primary',
        )}
        style={{
          backgroundColor: user.accentColor || '',
        }}
      />

      {url ? (
        <Image
          src={getMediaSource(url)}
          alt={user.displayName}
          fill
          className="rounded object-cover transition-transform group-hover:-translate-y-2 group-hover:translate-x-2"
        />
      ) : (
        <Card className="flex h-full w-full flex-col items-center justify-center gap-y-4 rounded transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
          <ChannelAvatar channel={user} isLive={isLive} />
        </Card>
      )}

      {isLive && (
        <div className="absolute right-2 top-2 transition-transform group-hover:-translate-y-2 group-hover:translate-x-1">
          <LiveBadge />
        </div>
      )}
    </div>
  );
}
