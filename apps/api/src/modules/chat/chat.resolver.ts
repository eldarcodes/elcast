import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import type { User } from '@/prisma/generated';
import type { PubSubService } from '@/src/core/pubsub/pubsub.service';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';

import type { ChatService } from './chat.service';
import type { ChangeChatSettingsInput } from './inputs/change-chat-settings.input';
import type { SendMessageInput } from './inputs/send-message.input';
import { ChatMessageModel } from './models/chat-message.model';

@Resolver('Chat')
export class ChatResolver {
  public constructor(
    private readonly chatService: ChatService,
    private readonly pubSubService: PubSubService,
  ) {}

  @Query(() => [ChatMessageModel], {
    name: 'findChatMessagesByStream',
  })
  public async findMessagesByStream(@Args('streamId') streamId: string) {
    return this.chatService.findByStream(streamId);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeChatSettings' })
  public async changeSettings(
    @Authorized() user: User,
    @Args('data') input: ChangeChatSettingsInput,
  ) {
    return this.chatService.changeSettings(user, input);
  }

  @Subscription(() => ChatMessageModel, {
    name: 'chatMessageAdded',
    filter: (payload, variables) => {
      return payload.chatMessageAdded.streamId === variables.streamId;
    },
  })
  public chatMessageAdded(@Args('streamId') streamId: string) {
    return this.pubSubService.subscribe('CHAT_MESSAGE_ADDED');
  }

  @Authorization()
  @Mutation(() => ChatMessageModel, { name: 'sendChatMessage' })
  public async sendMessage(
    @Authorized('id') userId: string,
    @Args('data') input: SendMessageInput,
  ) {
    return this.chatService.sendMessage(userId, input);
  }
}
