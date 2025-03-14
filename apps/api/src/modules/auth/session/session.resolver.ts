import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';

import { User } from '@/prisma/generated';
import { PubSubService } from '@/src/core/pubsub/pubsub.service';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import { UserAgent } from '@/src/shared/decorators/user-agent.decorator';
import type { GraphQLContext } from '@/src/shared/types/graphql-context.type';

import { AuthModel } from '../account/models/auth.model';
import { UserModel } from '../account/models/user.model';

import { LoginInput } from './inputs/login.input';
import { SessionModel } from './models/session.model';
import { SessionService } from './session.service';

@Resolver('Session')
export class SessionResolver {
  public constructor(
    private readonly sessionService: SessionService,
    private readonly pubSubService: PubSubService,
  ) {}

  @Subscription(() => UserModel)
  userStatusChanged() {
    return this.pubSubService.subscribe('USER_STATUS_CHANGED');
  }

  @Authorization()
  @Query(() => [SessionModel], {
    name: 'findSessionsByUser',
  })
  public async findByUser(@Context() { req }: GraphQLContext) {
    return this.sessionService.findByUser(req);
  }

  @Authorization()
  @Query(() => SessionModel, {
    name: 'findCurrentSession',
  })
  public async findCurrent(@Context() { req }: GraphQLContext) {
    return this.sessionService.findCurrent(req);
  }

  @Mutation(() => AuthModel, {
    name: 'loginUser',
  })
  public async login(
    @Context() { req }: GraphQLContext,
    @Args('data') input: LoginInput,
    @UserAgent() userAgent: string,
  ) {
    return this.sessionService.login(req, input, userAgent);
  }

  @Authorization()
  @Mutation(() => Boolean, {
    name: 'logoutUser',
  })
  public async logout(@Context() { req }: GraphQLContext) {
    return this.sessionService.logout(req);
  }

  @Mutation(() => Boolean, {
    name: 'clearSessionCookie',
  })
  public async clearSession(@Context() { req }: GraphQLContext) {
    return this.sessionService.clearSession(req);
  }

  @Authorization()
  @Mutation(() => Boolean, {
    name: 'removeSession',
  })
  public async remove(
    @Context() { req }: GraphQLContext,
    @Args('id') id: string,
  ) {
    return this.sessionService.remove(req, id);
  }

  @Authorization()
  @Mutation(() => Boolean, {
    name: 'setUserOffline',
  })
  async setUserOffline(@Authorized() user: User) {
    return this.sessionService.setUserPresenceStatus(user, false);
  }

  @Authorization()
  @Mutation(() => Boolean, {
    name: 'setUserOnline',
  })
  async setUserOnline(@Authorized() user: User) {
    return this.sessionService.setUserPresenceStatus(user, true);
  }

  @Authorization()
  @Query(() => [UserModel], {
    name: 'getOnlineUsers',
  })
  public async getOnlineUsers() {
    return this.sessionService.getOnlineUsers();
  }
}
