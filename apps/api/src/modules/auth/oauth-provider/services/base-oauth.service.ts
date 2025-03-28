import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { TypeBaseOAuthProviderOptions } from './types/base-provider-options.types';
import { TypeOAuthProviderUserInfo } from './types/user-info.types';

@Injectable()
export class BaseOAuthService {
  private BASE_URL: string;

  public constructor(private readonly options: TypeBaseOAuthProviderOptions) {}

  protected async extractUserInfo(
    data: any,
  ): Promise<TypeOAuthProviderUserInfo> {
    return {
      ...data,
      provider: this.options.name,
    };
  }

  public getAuthUrl() {
    const query = new URLSearchParams({
      response_type: 'code',
      client_id: this.options.client_id,
      redirect_uri: this.getRedirectUrl(),
      scope: this.options.scopes.join(' '),
      access_type: 'offline',
      prompt: 'select_account',
    });

    return `${this.options.authorize_url}?${query}`;
  }

  public async findUserByCode(
    code: string,
  ): Promise<TypeOAuthProviderUserInfo> {
    const clientId = this.options.client_id;
    const clientSecret = this.options.client_secret;

    const tokenQuery = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: this.getRedirectUrl(),
      grant_type: 'authorization_code',
      code,
    });

    const tokenRequest = await fetch(this.options.access_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: tokenQuery,
    });

    if (!tokenRequest.ok) {
      throw new BadRequestException(
        `Cannot get user from ${this.options.profile_url}. Please try again.`,
      );
    }

    const tokenData = await tokenRequest.json();

    if (!tokenData.access_token) {
      throw new BadRequestException(
        `No token data received from ${this.options.access_url}. Please try again.`,
      );
    }

    const profileRequest = await fetch(this.options.profile_url, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!profileRequest.ok) {
      throw new UnauthorizedException(
        `Cannot get user from ${this.options.profile_url}. Please try again.`,
      );
    }

    const profileData = await profileRequest.json();

    const userInfo = await this.extractUserInfo(profileData);

    return {
      ...userInfo,
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_at: tokenData.expires_at || tokenData.expires_in,
      provider: this.options.name,
    };
  }

  public getRedirectUrl() {
    return `${this.BASE_URL}/oauth/callback/${this.options.name}`;
  }

  set baseUrl(value: string) {
    this.BASE_URL = value;
  }

  get name() {
    return this.options.name;
  }

  get access_url() {
    return this.options.access_url;
  }

  get profile_url() {
    return this.options.profile_url;
  }

  get scopes() {
    return this.options.scopes;
  }
}
