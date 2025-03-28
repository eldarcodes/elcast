import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';

import { OAuth } from '@/src/shared/decorators/oauth.decorator';
import { UserAgent } from '@/src/shared/decorators/user-agent.decorator';

import { OAuthProviderService } from '../oauth-provider/oauth-provider.service';

import { OAuthService } from './oauth.service';

@Controller('oauth')
export class OAuthController {
  public constructor(
    private readonly oauthProviderService: OAuthProviderService,
    private readonly configService: ConfigService,
    private readonly oauthService: OAuthService,
  ) {}

  @OAuth()
  @Get('/callback/:provider')
  public async callback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string,
    @Param('provider') provider: string,
    @UserAgent() userAgent: string,
  ) {
    if (!code) {
      throw new BadRequestException('Invalid code');
    }

    await this.oauthService.extractProfileFromCode(
      req,
      provider,
      code,
      userAgent,
    );

    return res.redirect(
      `${this.configService.getOrThrow<string>('ALLOWED_ORIGIN')}/dashboard/settings`,
    );
  }

  @OAuth()
  @Get('/connect/:provider')
  public async connect(@Param('provider') provider: string) {
    const providerInstance = this.oauthProviderService.findByService(provider);

    return {
      url: providerInstance.getAuthUrl(),
    };
  }
}
