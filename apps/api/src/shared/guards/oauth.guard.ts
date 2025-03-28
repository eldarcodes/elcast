import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';

import { OAuthProviderService } from '@/src/modules/auth/oauth-provider/oauth-provider.service';

@Injectable()
export class OAuthGuard implements CanActivate {
  public constructor(
    private readonly authProviderService: OAuthProviderService,
  ) {}

  public canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request;

    const provider = request.params.provider;

    const providerInstance = this.authProviderService.findByService(provider);

    if (!providerInstance) {
      throw new NotFoundException(
        `Provider "${provider}" not found. Please check the entered data.`,
      );
    }

    return true;
  }
}
