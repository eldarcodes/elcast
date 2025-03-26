'use client';

import { useEffect } from 'react';

import { useSendUserPresenceHeartbeatMutation } from '@/graphql/generated/output';

import { useAuth } from '@/hooks/use-auth';
import { useOnlineUsers } from '@/hooks/use-online-users';

import { USER_ONLINE_HEARTBEAT } from '@/libs/constants/account.constants';

export function OnlineUsersHeartbeat() {
  const [onlineHeartbeat] = useSendUserPresenceHeartbeatMutation();
  const { isAuthenticated } = useAuth();
  const { forceUpdate } = useOnlineUsers();

  useEffect(() => {
    const sendHeartbeat = () => {
      if (document.visibilityState === 'visible' && isAuthenticated) {
        onlineHeartbeat();

        forceUpdate();
      }
    };

    sendHeartbeat();

    const interval = setInterval(sendHeartbeat, USER_ONLINE_HEARTBEAT);

    document.addEventListener('visibilitychange', sendHeartbeat);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', sendHeartbeat);
    };
  }, [onlineHeartbeat, isAuthenticated]);

  return null;
}
