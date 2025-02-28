import { FindChatMessagesByStreamQuery } from '@/graphql/generated/output';

import { stringToColor } from '@/utils/color';

interface MessageItemProps {
  message: FindChatMessagesByStreamQuery['findChatMessagesByStream'][0];
}

export function MessageItem({ message }: MessageItemProps) {
  const color = stringToColor(message.user.displayName ?? '');

  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex gap-2 rounded-md p-2 hover:bg-accent">
      <p className="text-sm text-muted-foreground">{formattedTime}</p>

      <div className="flex grow flex-wrap items-baseline gap-1">
        <p className="flex items-center whitespace-nowrap text-sm font-semibold">
          <span className="truncate" style={{ color }}>
            {message.user.displayName}
          </span>
        </p>
        <p className="break-all text-sm">{message.text}</p>
      </div>
    </div>
  );
}
