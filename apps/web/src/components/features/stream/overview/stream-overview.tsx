'use client';

import { LiveKitRoom } from '@livekit/components-react';
import { useParams } from 'next/navigation';

import { useFindChannelByUsernameQuery } from '@/graphql/generated/output';

import { useStreamToken } from '@/hooks/use-stream-token';

import { LIVEKIT_URL } from '@/libs/constants/url.constants';

import { LiveChat, LiveChatSkeleton } from '../../chat/live/live-chat';

import { AboutChannel, AboutChannelSkeleton } from './info/about-channel';
import { StreamInfo, StreamInfoSkeleton } from './info/stream-info';
import { StreamVideo, StreamVideoSkeleton } from './player/stream-video';

export function StreamOverview() {
  const { username } = useParams();

  const { data, loading } = useFindChannelByUsernameQuery({
    variables: {
      username: username as string,
    },
  });

  const channel = data?.findChannelByUsername;

  const { token, name, identity } = useStreamToken(channel?.id ?? '');

  if (loading || !channel || !token || !name || !identity) {
    return <StreamOverviewSkeleton />;
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={LIVEKIT_URL}
      className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 lg:grid-cols-7"
    >
      <div className="order-1 col-span-1 flex flex-col lg:col-span-5">
        <StreamVideo channel={channel} />
        <StreamInfo channel={channel} />
        <AboutChannel channel={channel} />
      </div>
      <div className="order-2 col-span-1 flex h-80 flex-col space-y-6 lg:col-span-2">
        <LiveChat
          channel={channel}
          isChatEnabled={channel.stream.isChatEnabled}
          isChatFollowersOnly={channel.stream.isChatFollowersOnly}
          isChatSubscribersOnly={channel.stream.isChatSubscribersOnly}
        />
      </div>
    </LiveKitRoom>
  );
}

export function StreamOverviewSkeleton() {
  return (
    <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 lg:grid-cols-7">
      <div className="order-1 col-span-1 flex flex-col lg:col-span-5">
        <StreamVideoSkeleton />
        <StreamInfoSkeleton />
        <AboutChannelSkeleton />
      </div>
      <div className="order-2 col-span-1 flex flex-col space-y-6 lg:col-span-2">
        <LiveChatSkeleton />
      </div>
    </div>
  );
}
