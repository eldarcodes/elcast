import { UseGuards } from '@nestjs/common';

import { TurnstileGuard } from '../guards/turnstile.guard';

export function Turnstile() {
  return UseGuards(TurnstileGuard);
}
