'use client';

import { LiveKitRoom } from '@livekit/components-react';

import { FindChannelByUsernameQuery } from '@/graphql/generated/output';

import { useStreamToken } from '@/hooks/use-stream-token';

import { LIVEKIT_URL } from '@/libs/constants/url.constants';

import { StreamVideo, StreamVideoSkeleton } from './player/stream-video';

interface StreamOverviewProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function StreamOverview({ channel }: StreamOverviewProps) {
  const { token, name, identity } = useStreamToken(channel.id);

  if (!token || !name || !identity) {
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
      </div>
      <div className="order-2 col-span-1 flex h-80 flex-col space-y-6 lg:col-span-2">
        test2
      </div>
    </LiveKitRoom>
  );
}

export function StreamOverviewSkeleton() {
  return (
    <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 lg:grid-cols-7">
      <div className="order-1 col-span-1 flex flex-col lg:col-span-5">
        <StreamVideoSkeleton />
        {/* <StreamInfoSkeleton /> */}
        {/* <AboutChannelSkeleton />  */}
      </div>
      <div className="order-2 col-span-1 flex h-80 flex-col space-y-6 lg:col-span-2">
        {/* <LiveChatSkeleton /> */}
      </div>
    </div>
  );
}
