import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { UserAgent } from '@/src/shared/decorators/user-agent.decorator';
import { GraphQLContext } from '@/src/shared/types/graphql-context.type';

import { NewPasswordInput } from './inputs/new-password.input';
import { ResetPasswordInput } from './inputs/reset-password.input';
import { PasswordRecoveryService } from './password-recovery.service';

@Resolver('PasswordRecovery')
export class PasswordRecoveryResolver {
  public constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService,
  ) {}

  @Mutation(() => Boolean, { name: 'resetPassword' })
  public async resetPassword(
    @Context() { req }: GraphQLContext,
    @Args('data') input: ResetPasswordInput,
    @UserAgent() userAgent: string,
  ) {
    return this.passwordRecoveryService.resetPassword(req, input, userAgent);
  }

  @Mutation(() => Boolean, { name: 'newPassword' })
  public async newPassword(@Args('data') input: NewPasswordInput) {
    return this.passwordRecoveryService.newPassword(input);
  }
}
