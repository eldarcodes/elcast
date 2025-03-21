import { Injectable } from '@nestjs/common';

import type { PrismaService } from '@/src/core/prisma/prisma.service';

import type { LivekitService } from '../libs/livekit/livekit.service';
import type { TelegramService } from '../libs/telegram/telegram.service';
import type { NotificationService } from '../notification/notification.service';

@Injectable()
export class WebhookService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly livekitService: LivekitService,
    private readonly notificationService: NotificationService,
    private readonly telegramService: TelegramService,
  ) {}

  public async receiveWebhookLivekit(body: string, authorization: string) {
    const event = this.livekitService.receiver.receive(
      body,
      authorization,
      true, // @TODO: consider remove
    );

    if (event.event === 'ingress_started') {
      const stream = await this.prismaService.stream.update({
        where: {
          ingressId: event.ingressInfo.ingressId,
        },
        data: {
          isLive: true,
        },
        include: {
          user: true,
        },
      });

      const followers = await this.prismaService.follow.findMany({
        where: {
          followingId: stream.userId,
          follower: {
            isDeactivated: false,
          },
        },
        include: {
          follower: {
            include: {
              notificationSettings: true,
            },
          },
        },
      });

      for (const { follower } of followers) {
        if (follower.notificationSettings.siteNotifications) {
          await this.notificationService.createStreamStart(
            follower.id,
            stream.user,
          );
        }

        if (
          follower.notificationSettings.telegramNotifications &&
          follower.telegramId
        ) {
          await this.telegramService.sendStreamStart(
            follower.telegramId,
            stream.user,
          );
        }
      }
    }

    if (event.event === 'ingress_ended') {
      const stream = await this.prismaService.stream.update({
        where: {
          ingressId: event.ingressInfo.ingressId,
        },
        data: {
          isLive: false,
        },
      });

      await this.prismaService.chatMessage.deleteMany({
        where: {
          streamId: stream.id,
        },
      });
    }
  }
}
