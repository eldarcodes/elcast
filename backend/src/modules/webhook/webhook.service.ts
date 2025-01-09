import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/src/core/prisma/prisma.service';

import { LivekitService } from '../libs/livekit/livekit.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class WebhookService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly livekitService: LivekitService,
    private readonly notificationService: NotificationService,
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
