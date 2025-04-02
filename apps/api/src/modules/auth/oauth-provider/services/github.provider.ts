import { BaseOAuthService } from './base-oauth.service';
import { TypeOAuthProviderOptions } from './types/provider-options.types';
import { TypeOAuthProviderUserInfo } from './types/user-info.types';

interface GitHubProfile extends Record<string, any> {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export class GitHubProvider extends BaseOAuthService {
  public constructor(options: TypeOAuthProviderOptions) {
    super({
      name: 'github',
      authorize_url: 'https://github.com/login/oauth/authorize',
      access_url: 'https://github.com/login/oauth/access_token',
      profile_url: 'https://api.github.com/user',
      scopes: options.scopes,
      client_id: options.client_id,
      client_secret: options.client_secret,
    });
  }

  public async extractUserInfo(data: GitHubProfile) {
    const userInfo: Omit<TypeOAuthProviderUserInfo, 'provider'> = {
      id: data.id.toString(),
      email: data.email,
      name: data.name || data.login,
      avatar: data.avatar_url,
      username: data.login,
      bio: data.bio,
    };

    return super.extractUserInfo(userInfo);
  }
}
