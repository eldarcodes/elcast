export interface TypeOAuthProviderUserInfo {
  id: string;
  avatar: string;
  name: string;
  email: string;
  provider: string;

  username?: string;
  bio?: string;
}
