import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

import { TokenType, User } from '@/prisma/generated';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import type { SessionMetadata } from '@/src/shared/types/session-metadata.type';

import { TELEGRAM_BUTTONS } from './telegram.buttons';
import { TELEGRAM_MESSAGES } from './telegram.messages';

@Update()
@Injectable()
export class TelegramService extends Telegraf {
  private readonly _token: string;

  private static readonly MESSAGE_TOKEN_INDEX = 1;

  public constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super(configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'));

    this._token = configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
  }

  @Start()
  public async onStart(@Ctx() ctx: any) {
    const chatId = ctx.chat.id.toString();
    const token =
      ctx.message.text.split(' ')[TelegramService.MESSAGE_TOKEN_INDEX];

    if (token) {
      const authToken = await this.prismaService.token.findUnique({
        where: {
          token,
          type: TokenType.TELEGRAM_AUTH,
        },
      });

      if (!authToken) {
        await ctx.reply(TELEGRAM_MESSAGES.invalidToken);
        return;
      }

      const hasExpired = new Date(authToken.expiresIn) < new Date();

      if (hasExpired) {
        await ctx.reply(TELEGRAM_MESSAGES.expiredToken);
        return;
      }

      await this.connectTelegram(authToken.userId, chatId);

      await this.prismaService.notificationSettings.update({
        where: {
          userId: authToken.userId,
        },
        data: {
          telegramNotifications: true,
        },
      });

      await this.prismaService.token.delete({ where: { id: authToken.id } });

      await ctx.replyWithHTML(
        TELEGRAM_MESSAGES.authSuccess,
        TELEGRAM_BUTTONS.authSuccess,
      );
      return;
    } else {
      const user = await this.findUserByChatId(chatId);

      if (user) {
        await this.onMe(ctx);
        return;
      }

      await ctx.replyWithHTML(
        TELEGRAM_MESSAGES.welcome,
        TELEGRAM_BUTTONS.profile,
      );
      return;
    }
  }

  @Command('me')
  @Action('me')
  public async onMe(@Ctx() ctx: Context) {
    const chatId = ctx.chat.id.toString();

    const user = await this.findUserByChatId(chatId);
    const followersCount = await this.prismaService.follow.count({
      where: {
        followingId: user.id,
      },
    });

    await ctx.replyWithHTML(
      TELEGRAM_MESSAGES.profile(user, followersCount),
      TELEGRAM_BUTTONS.profile,
    );
  }
  @Command('follows')
  @Action('follows')
  public async onFollows(@Ctx() ctx: Context) {
    const chatId = ctx.chat.id.toString();

    const user = await this.findUserByChatId(chatId);
    const follows = await this.prismaService.follow.findMany({
      where: {
        followerId: user.id,
      },
      include: {
        following: true,
      },
    });

    const minFollows = 1;

    if (user && follows.length > minFollows) {
      const followsList = follows
        .map((follow) => TELEGRAM_MESSAGES.follows(follow.following))
        .join('\n');

      const message = `<b>👥 Follows:</b>\n\n${followsList}`;

      await ctx.replyWithHTML(message);
    } else {
      await ctx.replyWithHTML('You are not following anyone yet.');
    }
  }

  public async sendPasswordResetToken(
    chatId: string,
    token: string,
    metadata: SessionMetadata,
  ) {
    this.telegram.sendMessage(
      chatId,
      TELEGRAM_MESSAGES.resetPassword(token, metadata),
      { parse_mode: 'HTML' },
    );
  }

  public async sendDeactivate(
    chatId: string,
    token: string,
    metadata: SessionMetadata,
  ) {
    this.telegram.sendMessage(
      chatId,
      TELEGRAM_MESSAGES.deactivate(token, metadata),
      { parse_mode: 'HTML' },
    );
  }

  public async sendStreamStart(chatId: string, channel: User) {
    this.telegram.sendMessage(chatId, TELEGRAM_MESSAGES.streamStart(channel), {
      parse_mode: 'HTML',
    });
  }

  public async sendNewFollowing(chatId: string, follower: User) {
    const user = await this.findUserByChatId(chatId);

    this.telegram.sendMessage(
      chatId,
      TELEGRAM_MESSAGES.newFollowing(follower, user.followings.length),
      { parse_mode: 'HTML' },
    );
  }

  public async sendAccountDeletion(chatId: string) {
    this.telegram.sendMessage(chatId, TELEGRAM_MESSAGES.accountDeleted, {
      parse_mode: 'HTML',
    });
  }

  public async sendEnableTwoFactor(chatId: string) {
    this.telegram.sendMessage(chatId, TELEGRAM_MESSAGES.enableTwoFactor, {
      parse_mode: 'HTML',
    });
  }

  public async sendVerifyChannel(chatId: string) {
    this.telegram.sendMessage(chatId, TELEGRAM_MESSAGES.verifyChannel, {
      parse_mode: 'HTML',
    });
  }

  private async connectTelegram(userId: string, chatId: string) {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        telegramId: chatId,
      },
    });
  }

  private async findUserByChatId(chatId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        telegramId: chatId,
      },
      include: {
        followers: true,
        followings: true,
      },
    });

    return user;
  }
}
