import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';

import { PubSubService } from '@/src/core/pubsub/pubsub.service';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import { Turnstile } from '@/src/shared/decorators/turnstile.decorator';
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

  @Turnstile()
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
    name: 'removeAllOtherSessions',
  })
  public async removeAll(@Context() { req }: GraphQLContext) {
    return this.sessionService.removeAllOther(req);
  }

  @Mutation(() => Boolean, {
    name: 'sendUserPresenceHeartbeat',
  })
  @Authorization()
  async sendHeartbeat(@Authorized('id') userId: string) {
    return this.sessionService.heartbeat(userId);
  }

  @Authorization()
  @Query(() => [UserModel], {
    name: 'getOnlineUsers',
  })
  public async getOnlineUsers() {
    return this.sessionService.getOnlineUsers();
  }

  @Subscription(() => UserModel, {
    resolve: (payload) => payload.userStatusChanged,
    filter: (payload, variables) => {
      return payload.userStatusChanged.id !== variables.userId;
    },
  })
  userStatusChanged(@Args('userId') userId: string) {
    return this.pubSubService.subscribe('USER_STATUS_CHANGED');
  }
}
