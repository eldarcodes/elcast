import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { getOauthProvidersConfig } from '@/src/core/config/oauth-providers.config';

import { OAuthProviderModule } from '../oauth-provider/oauth-provider.module';

import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';

@Module({
  imports: [
    OAuthProviderModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getOauthProvidersConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [OAuthController],
  providers: [OAuthService],
})
export class OAuthModule {}
