import { useEffect, useState } from 'react';

import {
  type FindChannelByUsernameQuery,
  FindChatMessagesByStreamQuery,
  useChatMessageAddedSubscription,
  useFindChatMessagesByStreamQuery,
} from '@/graphql/generated/output';

import { MessageItem } from './message-item';

interface MessagesListProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function MessagesList({ channel }: MessagesListProps) {
  const { data } = useFindChatMessagesByStreamQuery({
    variables: {
      streamId: channel.stream.id,
    },
  });

  useChatMessageAddedSubscription({
    variables: {
      streamId: channel.stream.id,
    },
    onData: ({ data }) => {
      const newMessage = data.data?.chatMessageAdded;

      if (newMessage) {
        setMessages((prev) => [newMessage, ...prev]);
      }
    },
  });

  const [messages, setMessages] = useState<
    FindChatMessagesByStreamQuery['findChatMessagesByStream']
  >([]);

  useEffect(() => {
    if (data && data.findChatMessagesByStream) {
      setMessages(data.findChatMessagesByStream);
    }
  }, [data]);

  return (
    <div className="flex h-full flex-1 flex-col-reverse overflow-y-auto">
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </div>
  );
}
