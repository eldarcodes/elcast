import { DynamicModule, Module } from '@nestjs/common';

import { OAuthProviderService } from './oauth-provider.service';
import {
  OAuthProviderOptionsSymbol,
  TypeOAuthProviderAsyncOptions,
  TypeOAuthProviderOptions,
} from './oauth-provider.types';

@Module({})
export class OAuthProviderModule {
  public static register(options: TypeOAuthProviderOptions): DynamicModule {
    return {
      module: OAuthProviderModule,
      providers: [
        {
          useValue: options.services,
          provide: OAuthProviderOptionsSymbol,
        },
        OAuthProviderService,
      ],
      exports: [OAuthProviderService],
    };
  }

  public static registerAsync(
    options: TypeOAuthProviderAsyncOptions,
  ): DynamicModule {
    return {
      module: OAuthProviderModule,
      imports: options.imports,
      providers: [
        {
          useFactory: options.useFactory,
          provide: OAuthProviderOptionsSymbol,
          inject: options.inject,
        },
        OAuthProviderService,
      ],
      exports: [OAuthProviderService],
    };
  }
}
