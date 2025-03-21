import { Skeleton } from '@/components/ui/common/skeleton';

import type { FindChannelByUsernameQuery } from '@/graphql/generated/output';

import { StreamSettings } from '../../settings/stream-settings';

import { FollowButton } from './follow-button';
import { ShareActions } from './share-actions';

interface StreamActionsProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function StreamActions({ channel }: StreamActionsProps) {
  return (
    <div className="mt-5 items-center space-x-3 space-y-4 lg:mt-0 lg:flex lg:space-y-0">
      <FollowButton channel={channel} />
      <StreamSettings channel={channel} />
      <ShareActions channel={channel} />
    </div>
  );
}

export function StreamActionsSkeleton() {
  return (
    <div className="mt-6 lg:mt-0">
      <div className="items-center gap-x-4 space-y-4 lg:flex lg:space-y-0">
        <Skeleton className="h-10 w-44 rounded-full" />
        <Skeleton className="size-10 rounded-full" />
      </div>
    </div>
  );
}
