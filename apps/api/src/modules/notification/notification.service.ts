import { Injectable } from '@nestjs/common';

import { NotificationType, TokenType, User } from '@/prisma/generated';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { PubSubService } from '@/src/core/pubsub/pubsub.service';
import { generateToken } from '@/src/shared/utils/generate-token.util';

import { ChangeNotificationSettingsInput } from './inputs/change-notification-settings.input';

@Injectable()
export class NotificationService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly pubSubService: PubSubService,
  ) {}

  public async findUnreadCount(user: User) {
    const count = await this.prismaService.notification.count({
      where: {
        isRead: false,
        userId: user.id,
      },
    });

    return count;
  }

  public async markAsRead(user: User) {
    await this.prismaService.notification.updateMany({
      where: {
        isRead: false,
        userId: user.id,
      },
      data: {
        isRead: true,
      },
    });

    return true;
  }

  public async findByUser(user: User) {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return notifications;
  }

  public async changeSettings(
    user: User,
    input: ChangeNotificationSettingsInput,
  ) {
    const { siteNotifications, telegramNotifications } = input;

    const notificationSettings =
      await this.prismaService.notificationSettings.upsert({
        where: {
          userId: user.id,
        },
        create: {
          siteNotifications,
          telegramNotifications,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
        update: {
          siteNotifications,
          telegramNotifications,
        },
        include: {
          user: true,
        },
      });

    if (
      notificationSettings.telegramNotifications &&
      !notificationSettings.user.telegramId
    ) {
      const telegramAuthToken = await generateToken(
        this.prismaService,
        user,
        TokenType.TELEGRAM_AUTH,
      );

      return {
        notificationSettings,
        telegramAuthToken: telegramAuthToken.token,
      };
    }

    if (
      !notificationSettings.telegramNotifications &&
      notificationSettings.user.telegramId
    ) {
      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          telegramId: null,
        },
      });

      return { notificationSettings };
    }

    return { notificationSettings };
  }

  public async createStreamStart(userId: string, channel: User) {
    const notification = await this.prismaService.notification.create({
      data: {
        message: `<b className='font-medium'>Don't miss out!</b>
        <p>Join the stream on the channel <a href='/${channel.username}' className='font-semibold'>${channel.displayName}</a>.</p>`,
        type: NotificationType.STREAM_START,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    this.pubSubService.publish('NOTIFICATION_ADDED', {
      notificationAdded: notification,
    });

    return notification;
  }

  public async createNewFollowing(userId: string, follower: User) {
    const notification = await this.prismaService.notification.create({
      data: {
        message: `<b className='font-medium'>You have a new follower!</b>
        <p>It's the user <a href='/${follower.username}' className='font-semibold'>${follower.displayName}</a>.</p>`,
        type: NotificationType.NEW_FOLLOWER,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: true,
      },
    });

    this.pubSubService.publish('NOTIFICATION_ADDED', {
      notificationAdded: notification,
    });

    return notification;
  }

  public async createEnableTwoFactor(userId: string) {
    const notification = await this.prismaService.notification.create({
      data: {
        message: `<b className='font-medium'>Secure your account!</b>
        <p>Enable two-factor authentication in your account settings to enhance your security.</p>`,
        type: NotificationType.ENABLE_TWO_FACTOR,
        userId,
      },
    });

    this.pubSubService.publish('NOTIFICATION_ADDED', {
      notificationAdded: notification,
    });

    return notification;
  }

  public async createVerifyChannel(userId: string) {
    const notification = await this.prismaService.notification.create({
      data: {
        message: `<b className='font-medium'>Congratulations!</b>
        <p>Your channel has been verified, and now a verification badge will appear next to your channel.</p>`,
        type: NotificationType.VERIFIED_CHANNEL,
        userId,
      },
    });

    this.pubSubService.publish('NOTIFICATION_ADDED', {
      notificationAdded: notification,
    });

    return notification;
  }
}
