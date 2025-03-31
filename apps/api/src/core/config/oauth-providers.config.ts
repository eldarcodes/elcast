import { ConfigService } from '@nestjs/config';

import { TypeOAuthProviderOptions } from '@/src/modules/auth/oauth-provider/oauth-provider.types';
import { GitHubProvider } from '@/src/modules/auth/oauth-provider/services/github.provider';
import { GoogleProvider } from '@/src/modules/auth/oauth-provider/services/google.provider';

/**
 * Конфигурация для провайдеров OAuth.
 *
 * Эта функция асинхронно извлекает параметры конфигурации из ConfigService
 * и формирует объект конфигурации для OAuth провайдеров.
 *
 * @param configService - Сервис для работы с конфигурацией приложения.
 * @returns Объект конфигурации для провайдеров OAuth.
 */
export const getOauthProvidersConfig = async (
  configService: ConfigService,
): Promise<TypeOAuthProviderOptions> => ({
  baseUrl: configService.getOrThrow<string>('APPLICATION_URL'),
  services: [
    new GoogleProvider({
      client_id: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      client_secret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      scopes: ['email', 'profile'],
    }),
    new GitHubProvider({
      client_id: configService.getOrThrow<string>('GITHUB_CLIENT_ID'),
      client_secret: configService.getOrThrow<string>('GITHUB_CLIENT_SECRET'),
      scopes: ['read:user'],
    }),
  ],
});
