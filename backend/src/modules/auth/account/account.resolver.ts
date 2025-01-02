import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';

import { AccountService } from './account.service';
import { CreateUserInput } from './inputs/create-user.input';
import { UserModel } from './models/user.model';

@Resolver('Account')
export class AccountResolver {
  public constructor(private readonly accountService: AccountService) {}

  @Authorization()
  @Query(() => UserModel, {
    name: 'findProfile',
    description: 'Find profile',
  })
  public async findProfile(@Authorized('id') id: string) {
    return this.accountService.me(id);
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
}
