import { USER_ONLINE_THRESHOLD } from '@/libs/constants/account.constants';

import { onlineUsersStore } from '@/store/online-users/online-users.store';

import { useCurrentProfile } from './use-current-profile';

export function useOnlineUsers() {
  const { user } = useCurrentProfile();

  const onlineUsers = onlineUsersStore((state) => state.onlineUsers);
  const setOnlineUsers = onlineUsersStore((state) => state.setOnlineUsers);
  const updateUserLastActive = onlineUsersStore(
    (state) => state.updateUserLastActive,
  );
  const forceUpdate = onlineUsersStore((state) => state.forceUpdate);

  const getLastActive = (userId: string) => onlineUsers[userId];

  const isUserOnline = (userId: string) => {
    const lastActive = onlineUsers[userId];

    if (!user) return false;
    if (user.id === userId) return true;
    if (!lastActive) return false;

    return Date.now() - new Date(lastActive).getTime() < USER_ONLINE_THRESHOLD;
  };

  return {
    onlineUsers,
    setOnlineUsers,
    updateUserLastActive,
    isUserOnline,
    forceUpdate,
    getLastActive,
  };
}
