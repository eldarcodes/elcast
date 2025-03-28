import { applyDecorators, UseGuards } from '@nestjs/common';

import { OAuthGuard } from '../guards/oauth.guard';

export function OAuth() {
  return applyDecorators(UseGuards(OAuthGuard));
}
