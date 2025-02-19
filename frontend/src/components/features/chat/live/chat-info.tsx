import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useAuth } from '@/hooks/use-auth';

interface ChatInfoProps {
  isOwnerChannel: boolean;
  isFollower: boolean;
  isChatEnabled: boolean;
  isChatFollowersOnly: boolean;
  isChatSubscribersOnly: boolean;
}

export function ChatInfo({
  isOwnerChannel,
  isFollower,
  isChatEnabled,
  isChatFollowersOnly,
  isChatSubscribersOnly,
}: ChatInfoProps) {
  const t = useTranslations('stream.chat.info');

  const { isAuthenticated } = useAuth();

  let message = '';

  if (!isAuthenticated) {
    message = t('authRequired');
  } else if (isOwnerChannel) {
    return null;
  } else if (!isChatEnabled) {
    message = t('chatDisabled');
  } else if (isChatSubscribersOnly) {
    message = t('premiumFollowersOnly');
  } else if (isChatFollowersOnly && !isFollower) {
    message = t('followersOnly');
  } else {
    return null;
  }

  return (
    <div className="mt-2 flex h-10 w-full items-center gap-x-2 rounded-md border bg-accent px-3 text-muted-foreground">
      <Info className="size-4" />
      <p className="text-sm font-semibold">{message}</p>
    </div>
  );
}
