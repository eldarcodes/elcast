import { type ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { User } from '@prisma/generated';

export const Authorized = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    let user: User;

    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest();

      user = request.user;
    } else {
      const context = GqlExecutionContext.create(ctx).getContext();
      const request = context.req;

      user = request.user;
    }

    return data ? user[data] : user;
  },
);
