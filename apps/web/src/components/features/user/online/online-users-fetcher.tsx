'use client';

import { useEffect } from 'react';

import { useGetOnlineUsersQuery } from '@/graphql/generated/output';

import { useOnlineUsers } from '@/hooks/use-online-users';

export function OnlineUsersFetcher() {
  const { data } = useGetOnlineUsersQuery();
  const { setOnlineUsers } = useOnlineUsers();

  useEffect(() => {
    if (data?.getOnlineUsers) {
      const usersMap = Object.fromEntries(
        data.getOnlineUsers.map((user) => [user.id, user.lastActive]),
      );

      setOnlineUsers(usersMap);
    }
  }, [data, setOnlineUsers]);

  return null;
}
