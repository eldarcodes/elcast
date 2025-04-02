import { ConfigService } from '@nestjs/config';

import { TurnstileOptions } from '@/src/shared/types/turnstile.type';

export function getTurnstileConfig(
  configService: ConfigService,
): TurnstileOptions {
  return {
    secretKey: configService.getOrThrow<string>(
      'CLOUDFLARE_TURNSTILE_SECRET_KEY',
    ),
    token: (req) => {
      const captcha = req.body.variables.data.captcha;

      return captcha;
    },
    skipIf(req: any) {
      const operationName = req.body?.operationName;

      if (operationName === 'LoginUser') {
        const hasTotp = req.body.variables.data.pin;

        return hasTotp;
      }

      return false;
    },
  };
}
