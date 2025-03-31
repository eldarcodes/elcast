import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import {
  OAuthProviderOptionsSymbol,
  TypeOAuthProviderOptions,
} from './oauth-provider.types';
import { BaseOAuthService } from './services/base-oauth.service';

@Injectable()
export class OAuthProviderService implements OnModuleInit {
  public constructor(
    @Inject(OAuthProviderOptionsSymbol)
    private readonly options: TypeOAuthProviderOptions,
  ) {}

  public onModuleInit() {
    for (const provider of this.options.services) {
      provider.baseUrl = this.options.baseUrl;
    }
  }

  public findByService(service: string): BaseOAuthService | null {
    return this.options.services.find((s) => s.name === service) ?? null;
  }
}
