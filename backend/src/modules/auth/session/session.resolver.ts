import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { UserAgent } from '@/src/shared/decorators/user-agent.decorator';
import type { GraphQLContext } from '@/src/shared/types/graphql-context.type';

import { UserModel } from '../account/models/user.model';

import { LoginInput } from './inputs/login.input';
import { SessionService } from './session.service';

@Resolver('Session')
export class SessionResolver {
  public constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => UserModel, {
    name: 'loginUser',
  })
  public async login(
    @Context() { req }: GraphQLContext,
    @Args('data') input: LoginInput,
    @UserAgent() userAgent: string,
  ) {
    return this.sessionService.login(req, input, userAgent);
  }

  @Mutation(() => Boolean, {
    name: 'logoutUser',
  })
  public async logout(@Context() { req }: GraphQLContext) {
    return this.sessionService.logout(req);
  }
}
