'use client';

import { useUserStatusChangedSubscription } from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';
import { useOnlineUsers } from '@/hooks/use-online-users';

export function OnlineUsersListener() {
  const { updateUserLastActive } = useOnlineUsers();
  const { user } = useCurrentProfile();

  useUserStatusChangedSubscription({
    onData: ({ data }) => {
      if (data.data?.userStatusChanged) {
        const { id, lastActive } = data.data.userStatusChanged;

        updateUserLastActive(id, lastActive);
      }
    },
    variables: {
      userId: user?.id || '',
    },
  });

  return null;
}
