import { ConfigService } from '@nestjs/config';

import { TurnstileOptions } from '@/src/shared/types/turnstile.type';
import { IS_DEV_ENV } from '@/src/shared/utils/is-dev.util';

export function getTurnstileConfig(
  configService: ConfigService,
): TurnstileOptions {
  return {
    secretKey: configService.getOrThrow<string>(
      'CLOUDFLARE_TURNSTILE_SECRET_KEY',
    ),
    token: (req) => {
      console.log(req.body);
      const captcha = req.body.variables.data.captcha;

      return captcha;
    },
    // skipIf: IS_DEV_ENV,
  };
}
