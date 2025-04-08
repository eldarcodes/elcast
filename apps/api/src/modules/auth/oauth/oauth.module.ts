import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { getOauthProvidersConfig } from '@/src/core/config/oauth-providers.config';

import { AccountModule } from '../account/account.module';
import { OAuthProviderModule } from '../oauth-provider/oauth-provider.module';

import { OAuthController } from './oauth.controller';
import { OAuthResolver } from './oauth.resolver';
import { OAuthService } from './oauth.service';

@Module({
  imports: [
    OAuthProviderModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getOauthProvidersConfig,
      inject: [ConfigService],
    }),
    AccountModule,
  ],
  controllers: [OAuthController],
  providers: [OAuthResolver, OAuthService],
})
export class OAuthModule {}
