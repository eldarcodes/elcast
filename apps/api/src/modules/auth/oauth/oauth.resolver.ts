import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';

import { OAuthAccountModel } from './models/oauth-account.model';
import { OAuthService } from './oauth.service';

@Resolver('OAuth')
export class OAuthResolver {
  public constructor(private readonly oauthService: OAuthService) {}

  @Authorization()
  @Query(() => [OAuthAccountModel], {
    name: 'getOAuthConnections',
  })
  public async getConnections(@Authorized('id') userId: string) {
    return this.oauthService.getOAuthConnections(userId);
  }

  @Authorization()
  @Mutation(() => Boolean, {
    name: 'disconnectOAuthConnection',
  })
  public async disconnect(
    @Authorized('id') userId: string,
    @Args('provider') provider: string,
    @Args('providerId') providerId: string,
  ) {
    return this.oauthService.disconnect(userId, provider, providerId);
  }
}
