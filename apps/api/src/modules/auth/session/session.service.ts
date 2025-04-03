import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import type { Request } from 'express';
import { TOTP } from 'otpauth';

import { PrismaService } from '@/src/core/prisma/prisma.service';
import { PubSubService } from '@/src/core/pubsub/pubsub.service';
import { RedisService } from '@/src/core/redis/redis.service';
import { USER_ONLINE_THRESHOLD } from '@/src/shared/constants/account.constants';
import { parseBoolean } from '@/src/shared/utils/parse-boolean.util';
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util';
import { destroySession, saveSession } from '@/src/shared/utils/session.util';

import { LoginInput } from './inputs/login.input';

@Injectable()
export class SessionService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly pubSubService: PubSubService,
  ) {}

  public async findByUser(req: Request) {
    const userId = req.session.userId;

    if (!userId) {
      throw new NotFoundException('User not found in session');
    }

    const keys = await this.redisService.keys('*');

    const userSessions = [];

    for (const key of keys) {
      const sessionData = await this.redisService.get(key);

      if (sessionData) {
        const session = JSON.parse(sessionData);

        const SESSION_ID_INDEX = 1;

        if (session.userId === userId) {
          userSessions.push({
            ...session,
            id: key.split(':')[SESSION_ID_INDEX],
          });
        }
      }
    }

    userSessions.sort((a, b) => b.createdAt - a.createdAt);

    return userSessions.filter((session) => session.id !== req.session.id);
  }

  public async findCurrent(req: Request) {
    const sessionId = req.session.id;
    const sessionData = await this.redisService.get(
      `${this.configService.getOrThrow<string>('SESSION_FOLDER')}${sessionId}`,
    );

    try {
      const session = JSON.parse(sessionData);

      const isExpired =
        session.cookie?.expires &&
        new Date(session.cookie.expires) < new Date();

      if (isExpired) {
        await this.clearSession(req);
        await this.remove(req, sessionId);

        throw new NotFoundException('Session not found');
      }

      return {
        ...session,
        id: sessionId,
      };
    } catch (error) {
      throw new NotFoundException('Session not found');
    }
  }

  public async login(req: Request, input: LoginInput, userAgent: string) {
    const { login, password, pin } = input;

    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { username: { equals: login.toLowerCase() } },
          { email: { equals: login } },
        ],
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isDeactivated) {
      throw new UnauthorizedException('User account is deactivated');
    }

    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    if (user.isTotpEnabled) {
      if (!pin) {
        return {
          message: 'TOTP required',
        };
      }

      const totp = new TOTP({
        issuer: 'Elcast',
        label: user.email,
        algorithm: 'SHA1',
        digits: 6,
        secret: user.totpSecret,
      });

      const delta = totp.validate({ token: pin });

      if (delta === null) {
        throw new BadRequestException('Invalid pin');
      }
    }

    const sessionMetadata = getSessionMetadata(req, userAgent);

    return saveSession(req, user, sessionMetadata);
  }

  public async logout(req: Request) {
    return destroySession(req, this.configService);
  }

  public async clearSession(req: Request) {
    req.res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'), {
      domain: this.configService.getOrThrow<string>('SESSION_DOMAIN'),
      path: '/',
      httpOnly: parseBoolean(
        this.configService.getOrThrow<string>('SESSION_HTTP_ONLY'),
      ),
      secure: parseBoolean(
        this.configService.getOrThrow<string>('SESSION_SECURE'),
      ),
    });

    return true;
  }

  public async remove(req: Request, id: string) {
    if (req.session.id === id) {
      throw new ConflictException('Cannot remove current session');
    }

    await this.redisService.del(
      `${this.configService.getOrThrow<string>('SESSION_FOLDER')}${id}`,
    );

    return true;
  }

  public async removeAllOther(req: Request) {
    const sessions = await this.findByUser(req);

    if (sessions.length === 0) {
      throw new NotFoundException('No sessions found');
    }

    for (const session of sessions) {
      await this.redisService.del(
        `${this.configService.getOrThrow<string>('SESSION_FOLDER')}${session.id}`,
      );
    }

    return true;
  }

  public async heartbeat(userId: string) {
    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: { lastActive: new Date() },
    });

    await this.pubSubService.publish('USER_STATUS_CHANGED', {
      userStatusChanged: updatedUser,
    });

    return true;
  }

  public async getOnlineUsers() {
    const threshold = new Date(Date.now() - USER_ONLINE_THRESHOLD);

    return this.prismaService.user.findMany({
      where: {
        lastActive: { gte: threshold },
      },
    });
  }
}
