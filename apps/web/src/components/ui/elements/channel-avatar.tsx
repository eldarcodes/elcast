'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { FindProfileQuery } from '@/graphql/generated/output';

import { useOnlineUsers } from '@/hooks/use-online-users';

import { getMediaSource } from '@/utils/get-media-source';
import { cn } from '@/utils/tw-merge';

import { Avatar, AvatarFallback, AvatarImage } from '../common/avatar';

const avatarSizes = cva('', {
  variants: {
    size: {
      sm: 'size-7',
      default: 'size-9',
      lg: 'size-14',
      xl: 'size-28',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const onlineBadgeSizes = cva('', {
  variants: {
    size: {
      sm: 'size-2',
      default: 'size-2',
      lg: 'size-3',
      xl: 'size-3',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface ChannelAvatarProps extends VariantProps<typeof avatarSizes> {
  channel: Pick<FindProfileQuery['findProfile'], 'id' | 'username' | 'avatar'>;
  isLive?: boolean;
  className?: string;
  showOnlineBadge?: boolean;
}

export function ChannelAvatar({
  size,
  channel,
  isLive,
  className,
  showOnlineBadge = true,
}: ChannelAvatarProps) {
  const { isUserOnline } = useOnlineUsers();

  const isOnline = isUserOnline(channel.id);

  return (
    <div>
      <div className={cn('relative h-full', className)}>
        <Avatar
          className={cn(avatarSizes({ size }), isLive && 'ring-2 ring-red-500')}
        >
          <AvatarImage
            src={getMediaSource(channel.avatar)}
            className="object-cover"
          />

          <AvatarFallback
            className={cn(
              size === 'xl' && 'text-4xl',
              size === 'lg' && 'text-2xl',
            )}
          >
            {channel.username && channel.username[0]}
          </AvatarFallback>
        </Avatar>

        {isOnline && showOnlineBadge && (
          <span
            className={cn(
              onlineBadgeSizes({ size }),
              'absolute bottom-[1px] right-0 block rounded-full border-2 border-white bg-green-500',
            )}
          />
        )}
      </div>
    </div>
  );
}
