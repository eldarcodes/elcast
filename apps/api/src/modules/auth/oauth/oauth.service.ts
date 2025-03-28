import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { PrismaService } from '@/src/core/prisma/prisma.service';
import { toSnakeCase } from '@/src/shared/utils/format.util';
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util';
import { saveSession } from '@/src/shared/utils/session.util';

import { OAuthProviderService } from '../oauth-provider/oauth-provider.service';

@Injectable()
export class OAuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly oauthProviderService: OAuthProviderService,
  ) {}

  public async extractProfileFromCode(
    req: Request,
    provider: string,
    code: string,
    userAgent: string,
  ) {
    const providerInstance = this.oauthProviderService.findByService(provider);
    const profile = await providerInstance.findUserByCode(code);

    let user = await this.prismaService.user.findUnique({
      where: { email: profile.email },
      include: { oauthAccounts: true },
    });

    if (user) {
      const linkedAccount = user.oauthAccounts.find(
        (acc) => acc.provider === provider,
      );

      if (!linkedAccount) {
        await this.prismaService.oAuthAccount.create({
          data: {
            userId: user.id,
            type: 'oauth',
            provider: profile.provider,
            accessToken: profile.access_token,
            refreshToken: profile.refresh_token,
            expiresAt: profile.expires_at,
          },
        });
      }
    } else {
      const username = toSnakeCase(profile.email.split('@')[0]);

      user = await this.prismaService.user.create({
        data: {
          email: profile.email,
          password: '',
          avatar: profile.picture,
          isEmailVerified: true,
          username,
          displayName: username,
          oauthAccounts: {
            create: {
              type: 'oauth',
              provider: profile.provider,
              accessToken: profile.access_token,
              refreshToken: profile.refresh_token,
              expiresAt: profile.expires_at,
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

    const sessionMetadata = getSessionMetadata(req, userAgent);

    return saveSession(req, user, sessionMetadata);
  }
}
