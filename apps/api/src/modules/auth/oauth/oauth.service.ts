import { ConflictException, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { PrismaService } from '@/src/core/prisma/prisma.service';
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util';
import { saveSession } from '@/src/shared/utils/session.util';

import { AccountService } from '../account/account.service';
import { OAuthProviderService } from '../oauth-provider/oauth-provider.service';
import { TypeOAuthProviderUserInfo } from '../oauth-provider/services/types/user-info.types';

@Injectable()
export class OAuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly accountService: AccountService,
    private readonly oauthProviderService: OAuthProviderService,
  ) {}

  private sanitizeUsername(username: string): string {
    return username
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_]/g, '')
      .toLowerCase();
  }

  private async generateUniqueUsername(
    rawUsername?: string,
    email?: string,
    name?: string,
  ): Promise<string> {
    let baseUsername = rawUsername || email?.split('@')[0] || name || 'user';

    baseUsername = this.sanitizeUsername(baseUsername) || 'user';

    let username = baseUsername;
    let counter = 1;

    while (await this.accountService.isUsernameTaken(username)) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    return username;
  }

  private async connectOAuthAccount(
    userId: string,
    provider: string,
    providerId: string,
    email: string,
  ) {
    await this.prismaService.oAuthAccount.create({
      data: {
        provider,
        providerId,
        userId,
        email,
      },
    });
  }

  private async registerOAuthAccount(profile: TypeOAuthProviderUserInfo) {
    const username = await this.generateUniqueUsername(
      profile.username,
      profile.email,
      profile.name,
    );

    return this.prismaService.user.create({
      data: {
        email: profile.email,
        password: '',
        avatar: profile.avatar,
        isEmailVerified: true,
        username,
        bio: profile.bio || '',
        displayName: username,
        oauthAccounts: {
          create: {
            provider: profile.provider,
            providerId: profile.id,
            email: profile.email,
          },
        },
        stream: {
          create: {
            title: `Stream ${username}`,
          },
        },
        notificationSettings: {
          create: {
            siteNotifications: true,
            telegramNotifications: false,
          },
        },
      },
      include: {
        oauthAccounts: true,
      },
    });
  }

  public async getOAuthConnections(userId: string) {
    return this.prismaService.oAuthAccount.findMany({
      where: {
        userId,
      },
    });
  }

  public async disconnect(
    userId: string,
    provider: string,
    providerId: string,
  ) {
    const account = await this.prismaService.oAuthAccount.findUnique({
      where: {
        provider_providerId: {
          provider,
          providerId,
        },
        userId,
      },
    });

    if (!account) {
      throw new ConflictException('Account not found');
    }

    await this.prismaService.oAuthAccount.delete({
      where: {
        provider_providerId: {
          provider: account.provider,
          providerId: account.providerId,
        },
        userId: account.userId,
      },
    });

    return true;
  }

  public async linkProviderAccount(
    userId: string,
    provider: string,
    code: string,
  ) {
    const providerInstance = this.oauthProviderService.findByService(provider);
    const profile = await providerInstance.findUserByCode(code);

    const existingLink = await this.prismaService.oAuthAccount.findFirst({
      where: {
        userId,
        provider: profile.provider,
      },
    });

    if (existingLink) {
      throw new ConflictException(
        `You have already linked your ${profile.provider} account.`,
      );
    }

    const existingAccount = await this.prismaService.oAuthAccount.findUnique({
      where: {
        provider_providerId: {
          provider: profile.provider,
          providerId: profile.id,
        },
      },
    });

    if (existingAccount) {
      if (existingAccount.userId !== userId) {
        throw new ConflictException(`Account already linked to another user`);
      }
    } else {
      await this.prismaService.oAuthAccount.create({
        data: {
          userId,
          email: profile.email,
          provider: profile.provider,
          providerId: profile.id,
        },
      });
    }
  }

  public async extractProfileFromCode(
    req: Request,
    provider: string,
    code: string,
    userAgent: string,
  ) {
    const providerInstance = this.oauthProviderService.findByService(provider);
    const profile = await providerInstance.findUserByCode(code);

    const existingOauthAccount =
      await this.prismaService.oAuthAccount.findUnique({
        where: {
          provider_providerId: {
            provider: profile.provider,
            providerId: profile.id,
          },
        },
      });

    let user = null;

    if (existingOauthAccount) {
      user = await this.prismaService.user.findUnique({
        where: { id: existingOauthAccount.userId },
      });
    } else {
      user = await this.prismaService.user.findUnique({
        where: { email: profile.email },
      });

      if (user) {
        await this.connectOAuthAccount(
          user.id,
          profile.provider,
          profile.id,
          profile.email,
        );
      } else {
        await this.registerOAuthAccount(profile);
      }
    }

    const sessionMetadata = getSessionMetadata(req, userAgent);

    return saveSession(req, user, sessionMetadata);
  }
}
