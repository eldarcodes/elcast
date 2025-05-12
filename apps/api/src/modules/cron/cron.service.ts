import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { PrismaService } from '@/src/core/prisma/prisma.service';
import {
  DAYS_TO_KEEP_DEACTIVATED_ACCOUNTS,
  MIN_TIME_TO_GET_VERIFIED,
} from '@/src/shared/constants/account.constants';

import { MailService } from '../libs/mail/mail.service';
import { StorageService } from '../libs/storage/storage.service';
import { TelegramService } from '../libs/telegram/telegram.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class CronService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly storageService: StorageService,
    private readonly telegramService: TelegramService,
    private readonly notificationService: NotificationService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_NOON) // 12:00 PM GMT every day
  public async deleteDeactivatedAccounts() {
    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(
      sevenDaysAgo.getDay() - DAYS_TO_KEEP_DEACTIVATED_ACCOUNTS,
    );

    const deactivatedAccounts = await this.prismaService.user.findMany({
      where: {
        isDeactivated: true,
        deactivatedAt: {
          lte: sevenDaysAgo,
        },
      },
      include: {
        notificationSettings: true,
        stream: true,
      },
    });

    for (const user of deactivatedAccounts) {
      await this.mailService.sendAccountDeletion(user.email);

      if (user.notificationSettings.telegramNotifications && user.telegramId) {
        await this.telegramService.sendAccountDeletion(user.telegramId);
      }

      if (user.avatar) {
        await this.storageService.remove(user.avatar);
      }

      if (user.stream.thumbnailUrl) {
        await this.storageService.remove(user.stream.thumbnailUrl);
      }
    }

    await this.prismaService.user.deleteMany({
      where: {
        isDeactivated: true,
        deactivatedAt: {
          lte: sevenDaysAgo,
        },
      },
    });
  }

  @Cron('0 12 * * 1') // every Monday at 12:00 GMT
  public async notifyUsersEnablingTwoFactorAuth() {
    const users = await this.prismaService.user.findMany({
      where: {
        isTotpEnabled: false,
      },
      include: {
        notificationSettings: true,
      },
    });

    for (const user of users) {
      if (user.notificationSettings.siteNotifications) {
        await this.mailService.sendEnableTwoFactor(
          user.email,
          user.displayName,
        );

        await this.notificationService.createEnableTwoFactor(user.id);
      }

      if (user.notificationSettings.telegramNotifications && user.telegramId) {
        await this.telegramService.sendEnableTwoFactor(user.telegramId);
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON) // 12:00 PM GMT every day
  public async verifyChannels() {
    const users = await this.prismaService.user.findMany({
      include: {
        notificationSettings: true,
      },
    });

    for (const user of users) {
      const isAccountOlderThan7Days =
        user.createdAt <= new Date(Date.now() - MIN_TIME_TO_GET_VERIFIED);

      if (isAccountOlderThan7Days && user.isEmailVerified && !user.isVerified) {
        await this.prismaService.user.update({
          where: {
            id: user.id,
          },
          data: {
            isVerified: true,
          },
        });

        if (user.notificationSettings.siteNotifications) {
          await this.mailService.sendVerifyChannel(
            user.email,
            user.displayName,
          );
          await this.notificationService.createVerifyChannel(user.id);
        }

        if (
          user.notificationSettings.telegramNotifications &&
          user.telegramId
        ) {
          await this.telegramService.sendVerifyChannel(user.telegramId);
        }
      }
    }
  }
}
