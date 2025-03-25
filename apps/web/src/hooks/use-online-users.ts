import { USER_ONLINE_THRESHOLD } from '@/libs/constants/account.constants';

import { onlineUsersStore } from '@/store/online-users/online-users.store';

export function useOnlineUsers() {
  const onlineUsers = onlineUsersStore((state) => state.onlineUsers);
  const setOnlineUsers = onlineUsersStore((state) => state.setOnlineUsers);
  const updateUserLastActive = onlineUsersStore(
    (state) => state.updateUserLastActive,
  );

  const isUserOnline = (userId: string) => {
    const lastActive = onlineUsers[userId];

    if (!lastActive) return false;

    return Date.now() - new Date(lastActive).getTime() < USER_ONLINE_THRESHOLD;
  };

  return {
    onlineUsers,
    setOnlineUsers,
    updateUserLastActive,
    isUserOnline,
  };
}
