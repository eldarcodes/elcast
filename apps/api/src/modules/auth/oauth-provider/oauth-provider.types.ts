import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

import { BaseOAuthService } from '@/src/modules/auth/oauth-provider/services/base-oauth.service';

export const OAuthProviderOptionsSymbol = Symbol();

export type TypeOAuthProviderOptions = {
  baseUrl: string;
  services: BaseOAuthService[];
};

export type TypeOAuthProviderAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<TypeOAuthProviderOptions>, 'useFactory' | 'inject'>;
