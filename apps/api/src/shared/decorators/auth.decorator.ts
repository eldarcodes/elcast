import { UseGuards, applyDecorators } from '@nestjs/common';

import { GqlAuthGuard } from '../guards/gql-auth.guard';

export function Authorization() {
  return applyDecorators(UseGuards(GqlAuthGuard));
}
