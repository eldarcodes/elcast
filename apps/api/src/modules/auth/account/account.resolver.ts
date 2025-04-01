import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '@/prisma/generated';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import { UserAgent } from '@/src/shared/decorators/user-agent.decorator';
import { GraphQLContext } from '@/src/shared/types/graphql-context.type';

import { AccountService } from './account.service';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { CreateUserInput } from './inputs/create-user.input';
import { AuthModel } from './models/auth.model';
import { UserProfileModel } from './models/user-profile.model';
import { UserModel } from './models/user.model';

@Resolver('Account')
export class AccountResolver {
  public constructor(private readonly accountService: AccountService) {}

  @Authorization()
  @Query(() => UserProfileModel, {
    name: 'findProfile',
    description: 'Find profile',
  })
  public async findProfile(@Authorized() user: User) {
    return this.accountService.me(user);
  }

  @Query(() => [UserModel], {
    name: 'findAllUsers',
    description: 'Find all users',
  })
  public async findAll() {
    return this.accountService.findAll();
  }

  @Mutation(() => Boolean, {
    name: 'createUser',
    description: 'Create a user',
  })
  public async create(@Args('data') input: CreateUserInput) {
    return this.accountService.create(input);
  }

  @Authorization()
  @Mutation(() => AuthModel, {
    name: 'changeEmail',
  })
  public async changeEmail(
    @Context() { req }: GraphQLContext,
    @Authorized() user: User,
    @Args('data') input: ChangeEmailInput,
    @UserAgent() userAgent: string,
  ) {
    return this.accountService.changeEmail(req, user, input, userAgent);
  }

  @Authorization()
  @Mutation(() => Boolean, {
    name: 'changePassword',
  })
  public async changePassword(
    @Authorized() user: User,
    @Args('data') input: ChangePasswordInput,
  ) {
    return this.accountService.changePassword(user, input);
  }
}
