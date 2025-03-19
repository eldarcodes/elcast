import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@/prisma/generated';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { PubSubService } from '@/src/core/pubsub/pubsub.service';

import { ChangeChatSettingsInput } from './inputs/change-chat-settings.input';
import { SendMessageInput } from './inputs/send-message.input';

@Injectable()
export class ChatService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly pubSubService: PubSubService,
  ) {}

  public async findByStream(streamId: string) {
    const messages = await this.prismaService.chatMessage.findMany({
      where: { streamId },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });

    return messages;
  }

  public async sendMessage(userId: string, input: SendMessageInput) {
    const { text, streamId } = input;

    const stream = await this.prismaService.stream.findUnique({
      where: { id: streamId },
    });

    if (!stream) {
      throw new NotFoundException('Stream not found');
    }

    const message = await this.prismaService.chatMessage.create({
      data: {
        text,
        user: { connect: { id: userId } },
        stream: { connect: { id: streamId } },
      },
      include: {
        stream: true,
        user: true,
      },
    });

    this.pubSubService.publish('CHAT_MESSAGE_ADDED', {
      chatMessageAdded: message,
    });

    return message;
  }

  public async changeSettings(user: User, input: ChangeChatSettingsInput) {
    const { isChatEnabled, isChatFollowersOnly, isChatSubscribersOnly } = input;

    await this.prismaService.stream.update({
      where: { userId: user.id },
      data: {
        isChatEnabled,
        isChatFollowersOnly,
        isChatSubscribersOnly,
      },
    });

    return true;
  }
}
