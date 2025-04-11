import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User } from '@/prisma/generated';

export const OptionalUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    let user: User | null = null;

    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest();
      user = request.user ?? null;
    } else {
      const context = GqlExecutionContext.create(ctx).getContext();
      user = context.req?.user ?? null;
    }

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
