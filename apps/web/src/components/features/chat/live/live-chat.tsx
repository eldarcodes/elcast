import { useConnectionState } from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/common/card';
import { Skeleton } from '@/components/ui/common/skeleton';

import {
  type FindChannelByUsernameQuery,
  useFindMyFollowingsQuery,
} from '@/graphql/generated/output';

import { useAuth } from '@/hooks/use-auth';
import { useCurrentProfile } from '@/hooks/use-current-profile';

import { ChatInfo } from './chat-info';
import { LoadingChat } from './loading-chat';
import { MessagesList } from './messages-list';
import { SendMessageForm } from './send-message-form';

interface LiveChatProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
  isChatEnabled: boolean;
  isChatFollowersOnly: boolean;
  isChatSubscribersOnly: boolean;
}

export function LiveChat({
  channel,
  isChatEnabled,
  isChatFollowersOnly,
  isChatSubscribersOnly,
}: LiveChatProps) {
  const t = useTranslations('stream.chat');

  const { isAuthenticated } = useAuth();
  const { user, isLoadingProfile } = useCurrentProfile();

  const { data: followingsData, loading: isLoadingFollowings } =
    useFindMyFollowingsQuery({
      skip: !isAuthenticated,
    });
  const followings = followingsData?.findMyFollowings ?? [];

  const isOwnerChannel = user?.id === channel.id;
  const isFollower = followings.some(
    (following) => following.followingId === channel.id,
  );

  const connectionState = useConnectionState();

  const isDisabled =
    !isAuthenticated ||
    !isChatEnabled ||
    (isChatFollowersOnly && !isFollower && !isOwnerChannel);

  if (
    connectionState === ConnectionState.Connecting ||
    isLoadingProfile ||
    isLoadingFollowings
  ) {
    return <LoadingChat />;
  }

  return (
    <Card className="flex h-[82%] w-full flex-col overflow-y-auto lg:fixed lg:w-[21.5%] xl:mt-0">
      <CardHeader className="border-b py-2">
        <CardTitle className="text-center text-lg">{t('heading')}</CardTitle>
      </CardHeader>

      <CardContent className="flex h-full flex-col overflow-y-auto p-4">
        <MessagesList channel={channel} />

        <ChatInfo
          isOwnerChannel={isOwnerChannel}
          isFollower={isFollower}
          isChatEnabled={isChatEnabled}
          isChatFollowersOnly={isChatFollowersOnly}
          isChatSubscribersOnly={isChatSubscribersOnly}
        />

        <SendMessageForm channel={channel} isDisabled={isDisabled} />
      </CardContent>
    </Card>
  );
}

export function LiveChatSkeleton() {
  return (
    <Skeleton className="fixed my-8 flex h-[82%] w-[21.5%] flex-col xl:mt-0" />
  );
}
