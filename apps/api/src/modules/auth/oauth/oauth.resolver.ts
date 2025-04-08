import { Query, Resolver } from '@nestjs/graphql';

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
}
