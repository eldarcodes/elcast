'use client';

import { useEffect } from 'react';

import { useSendUserPresenceHeartbeatMutation } from '@/graphql/generated/output';

import { useAuth } from '@/hooks/use-auth';

import { USER_ONLINE_HEARTBEAT } from '@/libs/constants/account.constants';

export function OnlineUsersHeartbeat() {
  const [onlineHeartbeat] = useSendUserPresenceHeartbeatMutation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const sendHeartbeat = () => {
      if (document.visibilityState === 'visible' && isAuthenticated) {
        onlineHeartbeat();
      }
    };

    sendHeartbeat();

    const interval = setInterval(sendHeartbeat, USER_ONLINE_HEARTBEAT);

    document.addEventListener('visibilitychange', sendHeartbeat);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', sendHeartbeat);
    };
  }, [onlineHeartbeat]);

  return null;
}
