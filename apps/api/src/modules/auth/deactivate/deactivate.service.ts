import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import type { Request } from 'express';

import { TokenType, type User } from '@/prisma/generated';
import type { PrismaService } from '@/src/core/prisma/prisma.service';
import type { RedisService } from '@/src/core/redis/redis.service';
import { generateToken } from '@/src/shared/utils/generate-token.util';
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util';
import { destroySession } from '@/src/shared/utils/session.util';

import type { MailService } from '../../libs/mail/mail.service';
import type { TelegramService } from '../../libs/telegram/telegram.service';

import type { DeactivateAccountInput } from './inputs/deactivate-account.input';

@Injectable()
export class DeactivateService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly telegramService: TelegramService,
    private readonly redisService: RedisService,
  ) {}

  private async validateDeactivateToken(req: Request, token: string) {
    const existingToken = await this.prismaService.token.findUnique({
      where: {
        token,
        type: TokenType.DEACTIVATE_ACCOUNT,
      },
    });

    if (!existingToken) {
      throw new NotFoundException('Token not found');
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date();

    if (hasExpired) {
      throw new BadRequestException('Token has expired');
    }

    const user = await this.prismaService.user.update({
      where: {
        id: existingToken.userId,
      },
      data: {
        isDeactivated: true,
        deactivatedAt: new Date(),
      },
    });

    await this.prismaService.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.DEACTIVATE_ACCOUNT,
      },
    });

    await this.clearSessions(user.id);

    return destroySession(req, this.configService);
  }

  public async sendDeactivateToken(
    req: Request,
    user: User,
    userAgent: string,
  ) {
    const deactivateToken = await generateToken(
      this.prismaService,
      user,
      TokenType.DEACTIVATE_ACCOUNT,
      false,
    );

    const sessionMetadata = getSessionMetadata(req, userAgent);

    await this.mailService.sendDeactivateToken(
      user.email,
      deactivateToken.token,
      sessionMetadata,
    );

    if (
      deactivateToken.user.notificationSettings.telegramNotifications &&
      deactivateToken.user.telegramId
    ) {
      await this.telegramService.sendDeactivate(
        deactivateToken.user.telegramId,
        deactivateToken.token,
        sessionMetadata,
      );
    }

    return true;
  }

  public async deactivate(
    req: Request,
    input: DeactivateAccountInput,
    user: User,
    userAgent: string,
  ) {
    const { email, password, pin } = input;

    if (user.isDeactivated) {
      throw new BadRequestException('Account is already deactivated');
    }

    if (user.email !== email) {
      throw new BadRequestException('Invalid email');
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    if (!pin) {
      await this.sendDeactivateToken(req, user, userAgent);

      return {
        message: 'Deactivate token has been sent to your email',
      };
    }

    await this.validateDeactivateToken(req, pin);

    return { user };
  }

  private async clearSessions(userId: string) {
    const keys = await this.redisService.keys('*');

    for (const key of keys) {
      const sessionData = await this.redisService.get(key);

      if (sessionData) {
        const session = JSON.parse(sessionData);

        if (session.userId === userId) {
          await this.redisService.del(key);
        }
      }
    }
  }
}
