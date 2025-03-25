'use client';

import { useUserStatusChangedSubscription } from '@/graphql/generated/output';

import { useOnlineUsers } from '@/hooks/use-online-users';

export function OnlineUsersListener() {
  const { updateUserLastActive } = useOnlineUsers();

  useUserStatusChangedSubscription({
    onData: ({ data }) => {
      if (data.data?.userStatusChanged) {
        const { id, lastActive } = data.data.userStatusChanged;

        updateUserLastActive(id, lastActive);
      }
    },
  });

  return null;
}
