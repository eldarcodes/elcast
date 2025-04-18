import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AuthModel = {
  __typename?: 'AuthModel';
  message?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserModel>;
};

export type CategoryModel = {
  __typename?: 'CategoryModel';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  slug: Scalars['String']['output'];
  streams: Array<StreamModel>;
  tags?: Maybe<Array<CategoryTagModel>>;
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CategoryTagModel = {
  __typename?: 'CategoryTagModel';
  category: CategoryModel;
  categoryId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  tag: TagModel;
  tagId: Scalars['String']['output'];
};

export type ChangeChatSettingsInput = {
  isChatEnabled: Scalars['Boolean']['input'];
  isChatFollowersOnly: Scalars['Boolean']['input'];
  isChatSubscribersOnly: Scalars['Boolean']['input'];
};

/** Change user E-Email */
export type ChangeEmailInput = {
  /** Email of the user */
  email: Scalars['String']['input'];
  pin?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeNotificationSettingsInput = {
  siteNotifications: Scalars['Boolean']['input'];
  telegramNotifications: Scalars['Boolean']['input'];
};

export type ChangeNotificationsSettingsResponse = {
  __typename?: 'ChangeNotificationsSettingsResponse';
  notificationSettings: NotificationSettingsModel;
  telegramAuthToken?: Maybe<Scalars['String']['output']>;
};

/** Change user password */
export type ChangePasswordInput = {
  /** New password of the user */
  newPassword: Scalars['String']['input'];
  /** Password of the user */
  oldPassword?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeProfileInfoInput = {
  bio: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
};

export type ChangeProfileUsernameInput = {
  username: Scalars['String']['input'];
};

export type ChangeStreamInfoInput = {
  categoryId: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type ChatMessageModel = {
  __typename?: 'ChatMessageModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  stream: StreamModel;
  streamId: Scalars['String']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

/** Create User Input */
export type CreateUserInput = {
  captcha: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeactivateAccountInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pin?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceModel = {
  __typename?: 'DeviceModel';
  browser: Scalars['String']['output'];
  os: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type EnableTotpInput = {
  pin: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type FiltersInput = {
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};

export type FollowModel = {
  __typename?: 'FollowModel';
  createdAt: Scalars['DateTime']['output'];
  follower: UserModel;
  followerId: Scalars['String']['output'];
  following: UserModel;
  followingId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GenerateStreamTokenInput = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type GenerateTokenModel = {
  __typename?: 'GenerateTokenModel';
  token: Scalars['String']['output'];
};

export type LocationModel = {
  __typename?: 'LocationModel';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

/** Login input */
export type LoginInput = {
  captcha: Scalars['String']['input'];
  /** Auth login */
  login: Scalars['String']['input'];
  /** Auth password */
  password: Scalars['String']['input'];
  pin?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changeChatSettings: Scalars['Boolean']['output'];
  changeEmail: AuthModel;
  changeNotificationSettings: ChangeNotificationsSettingsResponse;
  changePassword: Scalars['Boolean']['output'];
  changeProfileAvatar: Scalars['Boolean']['output'];
  changeProfileInfo: Scalars['Boolean']['output'];
  changeProfileUsername: Scalars['Boolean']['output'];
  changeStreamInfo: Scalars['Boolean']['output'];
  changeStreamThumbnail: Scalars['Boolean']['output'];
  clearSessionCookie: Scalars['Boolean']['output'];
  createIngress: Scalars['Boolean']['output'];
  createSocialLink: Scalars['Boolean']['output'];
  /** Create a user */
  createUser: Scalars['Boolean']['output'];
  deactivateAccount: AuthModel;
  disableTotp: Scalars['Boolean']['output'];
  disconnectOAuthConnection: Scalars['Boolean']['output'];
  enableTotp: Scalars['Boolean']['output'];
  followChannel: Scalars['Boolean']['output'];
  generateStreamToken: GenerateTokenModel;
  loginUser: AuthModel;
  logoutUser: Scalars['Boolean']['output'];
  markNotificationsAsRead: Scalars['Boolean']['output'];
  newPassword: Scalars['Boolean']['output'];
  removeAllOtherSessions: Scalars['Boolean']['output'];
  removeProfileAvatar: Scalars['Boolean']['output'];
  removeSession: Scalars['Boolean']['output'];
  removeSocialLink: Scalars['Boolean']['output'];
  removeStreamThumbnail: Scalars['Boolean']['output'];
  reorderSocialLinks: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  sendChatMessage: ChatMessageModel;
  sendUserPresenceHeartbeat: Scalars['Boolean']['output'];
  sendVerificationCode: AuthModel;
  sendVerificationToken: AuthModel;
  unfollowChannel: Scalars['Boolean']['output'];
  updateSocialLink: Scalars['Boolean']['output'];
  verifyAccountByCode: AuthModel;
  verifyAccountByToken: AuthModel;
};


export type MutationChangeChatSettingsArgs = {
  data: ChangeChatSettingsInput;
};


export type MutationChangeEmailArgs = {
  data: ChangeEmailInput;
};


export type MutationChangeNotificationSettingsArgs = {
  data: ChangeNotificationSettingsInput;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationChangeProfileAvatarArgs = {
  avatar: Scalars['Upload']['input'];
};


export type MutationChangeProfileInfoArgs = {
  data: ChangeProfileInfoInput;
};


export type MutationChangeProfileUsernameArgs = {
  data: ChangeProfileUsernameInput;
};


export type MutationChangeStreamInfoArgs = {
  data: ChangeStreamInfoInput;
};


export type MutationChangeStreamThumbnailArgs = {
  thumbnail: Scalars['Upload']['input'];
};


export type MutationCreateIngressArgs = {
  ingressType: Scalars['Float']['input'];
};


export type MutationCreateSocialLinkArgs = {
  data: SocialLinkInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeactivateAccountArgs = {
  data: DeactivateAccountInput;
};


export type MutationDisconnectOAuthConnectionArgs = {
  provider: Scalars['String']['input'];
  providerId: Scalars['String']['input'];
};


export type MutationEnableTotpArgs = {
  data: EnableTotpInput;
};


export type MutationFollowChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationGenerateStreamTokenArgs = {
  data: GenerateStreamTokenInput;
};


export type MutationLoginUserArgs = {
  data: LoginInput;
};


export type MutationNewPasswordArgs = {
  data: NewPasswordInput;
};


export type MutationRemoveSessionArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveSocialLinkArgs = {
  id: Scalars['String']['input'];
};


export type MutationReorderSocialLinksArgs = {
  list: Array<SocialLinkOrderInput>;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationSendChatMessageArgs = {
  data: SendMessageInput;
};


export type MutationUnfollowChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationUpdateSocialLinkArgs = {
  data: SocialLinkInput;
  id: Scalars['String']['input'];
};


export type MutationVerifyAccountByCodeArgs = {
  data: VerificationCodeInput;
};


export type MutationVerifyAccountByTokenArgs = {
  data: VerificationTokenInput;
};

export type NewPasswordInput = {
  password: Scalars['String']['input'];
  passwordRepeat: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type NotificationModel = {
  __typename?: 'NotificationModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  type: NotificationType;
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type NotificationSettingsModel = {
  __typename?: 'NotificationSettingsModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  siteNotifications: Scalars['Boolean']['output'];
  telegramNotifications: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export enum NotificationType {
  EnableTwoFactor = 'ENABLE_TWO_FACTOR',
  NewFollower = 'NEW_FOLLOWER',
  NewSponsorship = 'NEW_SPONSORSHIP',
  StreamStart = 'STREAM_START',
  VerifiedChannel = 'VERIFIED_CHANNEL'
}

/** OAuth account model */
export type OAuthAccountModel = {
  __typename?: 'OAuthAccountModel';
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  provider: Scalars['String']['output'];
  providerId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAllCategories: Array<CategoryModel>;
  findAllStreams: Array<StreamModel>;
  findAllStreamsByUsername: Array<StreamModel>;
  /** Find all users */
  findAllUsers: Array<UserModel>;
  findCategoryBySlug: CategoryModel;
  findChannelByUsername: UserModel;
  findChatMessagesByStream: Array<ChatMessageModel>;
  findCurrentSession: SessionModel;
  findFollowersCountByChannel: Scalars['Float']['output'];
  findMyFollowers: Array<FollowModel>;
  findMyFollowings: Array<FollowModel>;
  findNotificationsByUser: Array<NotificationModel>;
  findNotificationsUnreadCount: Scalars['Float']['output'];
  /** Find profile */
  findProfile: UserProfileModel;
  findRandomCategories: Array<CategoryModel>;
  findRandomStreams: Array<StreamModel>;
  findRecommendedChannels: Array<UserModel>;
  findSessionsByUser: Array<SessionModel>;
  findSocialLinks: Array<SocialLinkModel>;
  generateTotpSecret: TotpModel;
  getOAuthConnections: Array<OAuthAccountModel>;
  getOnlineUsers: Array<UserModel>;
};


export type QueryFindAllStreamsArgs = {
  filters: FiltersInput;
};


export type QueryFindAllStreamsByUsernameArgs = {
  filters: UsernameFiltersInput;
};


export type QueryFindCategoryBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryFindChannelByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryFindChatMessagesByStreamArgs = {
  streamId: Scalars['String']['input'];
};


export type QueryFindFollowersCountByChannelArgs = {
  channelId: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  captcha: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type SendMessageInput = {
  streamId: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type SessionMetadataModel = {
  __typename?: 'SessionMetadataModel';
  device: DeviceModel;
  ip: Scalars['String']['output'];
  location: LocationModel;
};

export type SessionModel = {
  __typename?: 'SessionModel';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata: SessionMetadataModel;
  userId: Scalars['String']['output'];
};

export type SocialLinkInput = {
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type SocialLinkModel = {
  __typename?: 'SocialLinkModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  position: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type SocialLinkOrderInput = {
  id: Scalars['String']['input'];
  position: Scalars['Float']['input'];
};

export type StreamModel = {
  __typename?: 'StreamModel';
  category?: Maybe<CategoryModel>;
  categoryId?: Maybe<Scalars['String']['output']>;
  chatMessages: Array<ChatMessageModel>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  ingressId?: Maybe<Scalars['String']['output']>;
  isChatEnabled: Scalars['Boolean']['output'];
  isChatFollowersOnly: Scalars['Boolean']['output'];
  isChatSubscribersOnly: Scalars['Boolean']['output'];
  isLive: Scalars['Boolean']['output'];
  serverUrl?: Maybe<Scalars['String']['output']>;
  streamKey?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<StreamTagModel>>;
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type StreamTagModel = {
  __typename?: 'StreamTagModel';
  createdAt: Scalars['DateTime']['output'];
  stream: StreamModel;
  streamId: Scalars['String']['output'];
  tag: TagModel;
  tagId: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chatMessageAdded: ChatMessageModel;
  notificationAdded: NotificationModel;
  userStatusChanged: UserModel;
};


export type SubscriptionChatMessageAddedArgs = {
  streamId: Scalars['String']['input'];
};


export type SubscriptionNotificationAddedArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionUserStatusChangedArgs = {
  userId: Scalars['String']['input'];
};

export type TagModel = {
  __typename?: 'TagModel';
  categoryTags: Array<CategoryTagModel>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  streamTags: Array<StreamTagModel>;
};

export type TotpModel = {
  __typename?: 'TotpModel';
  qrcodeUrl: Scalars['String']['output'];
  secret: Scalars['String']['output'];
};

/** User model */
export type UserModel = {
  __typename?: 'UserModel';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deactivatedAt?: Maybe<Scalars['DateTime']['output']>;
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  followers: Array<FollowModel>;
  followings: Array<FollowModel>;
  id: Scalars['ID']['output'];
  isDeactivated: Scalars['Boolean']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isTotpEnabled: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  lastActive: Scalars['DateTime']['output'];
  lastEmailChange?: Maybe<Scalars['DateTime']['output']>;
  lastUsernameChange?: Maybe<Scalars['DateTime']['output']>;
  notificationSettings: NotificationSettingsModel;
  notifications: Array<NotificationModel>;
  password: Scalars['String']['output'];
  socialLinks: Array<SocialLinkModel>;
  stream: StreamModel;
  telegramId?: Maybe<Scalars['String']['output']>;
  totpSecret?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

/** User profile model */
export type UserProfileModel = {
  __typename?: 'UserProfileModel';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deactivatedAt?: Maybe<Scalars['DateTime']['output']>;
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  followers: Array<FollowModel>;
  followings: Array<FollowModel>;
  hasPassword: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isDeactivated: Scalars['Boolean']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isTotpEnabled: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  lastActive: Scalars['DateTime']['output'];
  lastEmailChange?: Maybe<Scalars['DateTime']['output']>;
  lastUsernameChange?: Maybe<Scalars['DateTime']['output']>;
  notificationSettings: NotificationSettingsModel;
  notifications: Array<NotificationModel>;
  password: Scalars['String']['output'];
  socialLinks: Array<SocialLinkModel>;
  stream: StreamModel;
  telegramId?: Maybe<Scalars['String']['output']>;
  totpSecret?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UsernameFiltersInput = {
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type VerificationCodeInput = {
  code: Scalars['String']['input'];
};

export type VerificationTokenInput = {
  token: Scalars['String']['input'];
};

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: boolean };

export type DeactivateAccountMutationVariables = Exact<{
  data: DeactivateAccountInput;
}>;


export type DeactivateAccountMutation = { __typename?: 'Mutation', deactivateAccount: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', id: string, isDeactivated: boolean, deactivatedAt?: any | null } | null } };

export type LoginUserMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', username: string } | null } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type NewPasswordMutationVariables = Exact<{
  data: NewPasswordInput;
}>;


export type NewPasswordMutation = { __typename?: 'Mutation', newPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type SendVerificationCodeMutationVariables = Exact<{ [key: string]: never; }>;


export type SendVerificationCodeMutation = { __typename?: 'Mutation', sendVerificationCode: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', id: string, isEmailVerified: boolean } | null } };

export type SendVerificationTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type SendVerificationTokenMutation = { __typename?: 'Mutation', sendVerificationToken: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', id: string, isEmailVerified: boolean } | null } };

export type VerifyAccountByCodeMutationVariables = Exact<{
  data: VerificationCodeInput;
}>;


export type VerifyAccountByCodeMutation = { __typename?: 'Mutation', verifyAccountByCode: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', isEmailVerified: boolean } | null } };

export type VerifyAccountByLinkMutationVariables = Exact<{
  data: VerificationTokenInput;
}>;


export type VerifyAccountByLinkMutation = { __typename?: 'Mutation', verifyAccountByToken: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', isEmailVerified: boolean } | null } };

export type ChangeChatSettingsMutationVariables = Exact<{
  data: ChangeChatSettingsInput;
}>;


export type ChangeChatSettingsMutation = { __typename?: 'Mutation', changeChatSettings: boolean };

export type SendChatMessageMutationVariables = Exact<{
  data: SendMessageInput;
}>;


export type SendChatMessageMutation = { __typename?: 'Mutation', sendChatMessage: { __typename?: 'ChatMessageModel', streamId: string } };

export type FollowChannelMutationVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type FollowChannelMutation = { __typename?: 'Mutation', followChannel: boolean };

export type UnfollowChannelMutationVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type UnfollowChannelMutation = { __typename?: 'Mutation', unfollowChannel: boolean };

export type ChangeStreamInfoMutationVariables = Exact<{
  data: ChangeStreamInfoInput;
}>;


export type ChangeStreamInfoMutation = { __typename?: 'Mutation', changeStreamInfo: boolean };

export type ChangeStreamThumbnailMutationVariables = Exact<{
  thumbnail: Scalars['Upload']['input'];
}>;


export type ChangeStreamThumbnailMutation = { __typename?: 'Mutation', changeStreamThumbnail: boolean };

export type CreateIngressMutationVariables = Exact<{
  type: Scalars['Float']['input'];
}>;


export type CreateIngressMutation = { __typename?: 'Mutation', createIngress: boolean };

export type GenerateStreamTokenMutationVariables = Exact<{
  data: GenerateStreamTokenInput;
}>;


export type GenerateStreamTokenMutation = { __typename?: 'Mutation', generateStreamToken: { __typename?: 'GenerateTokenModel', token: string } };

export type RemoveStreamThumbnailMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveStreamThumbnailMutation = { __typename?: 'Mutation', removeStreamThumbnail: boolean };

export type ChangeEmailMutationVariables = Exact<{
  data: ChangeEmailInput;
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', changeEmail: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', id: string, email: string, isEmailVerified: boolean, lastEmailChange?: any | null } | null } };

export type ChangeNotificationsSettingsMutationVariables = Exact<{
  data: ChangeNotificationSettingsInput;
}>;


export type ChangeNotificationsSettingsMutation = { __typename?: 'Mutation', changeNotificationSettings: { __typename?: 'ChangeNotificationsSettingsResponse', telegramAuthToken?: string | null, notificationSettings: { __typename?: 'NotificationSettingsModel', siteNotifications: boolean, telegramNotifications: boolean, id: string } } };

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type ChangeProfileAvatarMutationVariables = Exact<{
  avatar: Scalars['Upload']['input'];
}>;


export type ChangeProfileAvatarMutation = { __typename?: 'Mutation', changeProfileAvatar: boolean };

export type ChangeProfileInfoMutationVariables = Exact<{
  data: ChangeProfileInfoInput;
}>;


export type ChangeProfileInfoMutation = { __typename?: 'Mutation', changeProfileInfo: boolean };

export type ChangeProfileUsernameMutationVariables = Exact<{
  data: ChangeProfileUsernameInput;
}>;


export type ChangeProfileUsernameMutation = { __typename?: 'Mutation', changeProfileUsername: boolean };

export type ClearSessionCookieMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearSessionCookieMutation = { __typename?: 'Mutation', clearSessionCookie: boolean };

export type CreateSocialLinkMutationVariables = Exact<{
  data: SocialLinkInput;
}>;


export type CreateSocialLinkMutation = { __typename?: 'Mutation', createSocialLink: boolean };

export type DisableTotpMutationVariables = Exact<{ [key: string]: never; }>;


export type DisableTotpMutation = { __typename?: 'Mutation', disableTotp: boolean };

export type DisconnectOAuthConnectionMutationVariables = Exact<{
  provider: Scalars['String']['input'];
  providerId: Scalars['String']['input'];
}>;


export type DisconnectOAuthConnectionMutation = { __typename?: 'Mutation', disconnectOAuthConnection: boolean };

export type EnableTotpMutationVariables = Exact<{
  data: EnableTotpInput;
}>;


export type EnableTotpMutation = { __typename?: 'Mutation', enableTotp: boolean };

export type MarkNotificationsAsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkNotificationsAsReadMutation = { __typename?: 'Mutation', markNotificationsAsRead: boolean };

export type RemoveAllOtherSessionsMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveAllOtherSessionsMutation = { __typename?: 'Mutation', removeAllOtherSessions: boolean };

export type RemoveProfileAvatarMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveProfileAvatarMutation = { __typename?: 'Mutation', removeProfileAvatar: boolean };

export type RemoveSessionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSessionMutation = { __typename?: 'Mutation', removeSession: boolean };

export type RemoveSocialLinkMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSocialLinkMutation = { __typename?: 'Mutation', removeSocialLink: boolean };

export type ReorderSocialLinksMutationVariables = Exact<{
  list: Array<SocialLinkOrderInput> | SocialLinkOrderInput;
}>;


export type ReorderSocialLinksMutation = { __typename?: 'Mutation', reorderSocialLinks: boolean };

export type SendUserPresenceHeartbeatMutationVariables = Exact<{ [key: string]: never; }>;


export type SendUserPresenceHeartbeatMutation = { __typename?: 'Mutation', sendUserPresenceHeartbeat: boolean };

export type UpdateSocialLinkMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: SocialLinkInput;
}>;


export type UpdateSocialLinkMutation = { __typename?: 'Mutation', updateSocialLink: boolean };

export type FindAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllCategoriesQuery = { __typename?: 'Query', findAllCategories: Array<{ __typename?: 'CategoryModel', id: string, title: string, description?: string | null, slug: string, createdAt: any, thumbnailUrl: string, updatedAt: any, tags?: Array<{ __typename?: 'CategoryTagModel', tag: { __typename?: 'TagModel', id: string, name: string } }> | null }> };

export type FindCategoryBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type FindCategoryBySlugQuery = { __typename?: 'Query', findCategoryBySlug: { __typename?: 'CategoryModel', id: string, title: string, thumbnailUrl: string, description?: string | null, createdAt: any, tags?: Array<{ __typename?: 'CategoryTagModel', tag: { __typename?: 'TagModel', id: string, name: string } }> | null, streams: Array<{ __typename?: 'StreamModel', id: string, title: string, thumbnailUrl?: string | null, isLive: boolean, user: { __typename?: 'UserModel', username: string, displayName: string, avatar?: string | null, id: string, isVerified: boolean }, category?: { __typename?: 'CategoryModel', title: string, slug: string, description?: string | null } | null, tags?: Array<{ __typename?: 'StreamTagModel', tag: { __typename?: 'TagModel', id: string, name: string } }> | null }> } };

export type FindRandomCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRandomCategoriesQuery = { __typename?: 'Query', findRandomCategories: Array<{ __typename?: 'CategoryModel', id: string, title: string, description?: string | null, slug: string, createdAt: any, thumbnailUrl: string, tags?: Array<{ __typename?: 'CategoryTagModel', tag: { __typename?: 'TagModel', id: string, name: string } }> | null }> };

export type FindRecommendedChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRecommendedChannelsQuery = { __typename?: 'Query', findRecommendedChannels: Array<{ __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null, isVerified: boolean, stream: { __typename?: 'StreamModel', isLive: boolean } }> };

export type FindChatMessagesByStreamQueryVariables = Exact<{
  streamId: Scalars['String']['input'];
}>;


export type FindChatMessagesByStreamQuery = { __typename?: 'Query', findChatMessagesByStream: Array<{ __typename?: 'ChatMessageModel', createdAt: any, text: string, user: { __typename?: 'UserModel', id: string, username: string, displayName: string } }> };

export type FindMyFollowersQueryVariables = Exact<{ [key: string]: never; }>;


export type FindMyFollowersQuery = { __typename?: 'Query', findMyFollowers: Array<{ __typename?: 'FollowModel', createdAt: any, follower: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null, isVerified: boolean } }> };

export type FindMyFollowingsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindMyFollowingsQuery = { __typename?: 'Query', findMyFollowings: Array<{ __typename?: 'FollowModel', id: string, createdAt: any, followingId: string }> };

export type FindAllStreamsQueryVariables = Exact<{
  filters: FiltersInput;
}>;


export type FindAllStreamsQuery = { __typename?: 'Query', findAllStreams: Array<{ __typename?: 'StreamModel', id: string, title: string, thumbnailUrl?: string | null, isLive: boolean, tags?: Array<{ __typename?: 'StreamTagModel', tag: { __typename?: 'TagModel', id: string, name: string } }> | null, user: { __typename?: 'UserModel', username: string, displayName: string, avatar?: string | null, id: string, isVerified: boolean }, category?: { __typename?: 'CategoryModel', title: string, slug: string, description?: string | null } | null }> };

export type FindAllStreamsByUsernameQueryVariables = Exact<{
  filters: UsernameFiltersInput;
}>;


export type FindAllStreamsByUsernameQuery = { __typename?: 'Query', findAllStreamsByUsername: Array<{ __typename?: 'StreamModel', id: string, user: { __typename?: 'UserModel', displayName: string, username: string, avatar?: string | null, id: string }, category?: { __typename?: 'CategoryModel', title: string } | null }> };

export type FindChannelByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type FindChannelByUsernameQuery = { __typename?: 'Query', findChannelByUsername: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null, bio?: string | null, isVerified: boolean, lastActive: any, socialLinks: Array<{ __typename?: 'SocialLinkModel', id: string, title: string, url: string }>, stream: { __typename?: 'StreamModel', id: string, title: string, thumbnailUrl?: string | null, isLive: boolean, isChatEnabled: boolean, isChatFollowersOnly: boolean, isChatSubscribersOnly: boolean, tags?: Array<{ __typename?: 'StreamTagModel', tag: { __typename?: 'TagModel', id: string, name: string } }> | null, category?: { __typename?: 'CategoryModel', id: string, title: string } | null }, followings: Array<{ __typename?: 'FollowModel', id: string }> } };

export type FindRandomStreamsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRandomStreamsQuery = { __typename?: 'Query', findRandomStreams: Array<{ __typename?: 'StreamModel', id: string, title: string, thumbnailUrl?: string | null, isLive: boolean, tags?: Array<{ __typename?: 'StreamTagModel', tag: { __typename?: 'TagModel', id: string, name: string } }> | null, user: { __typename?: 'UserModel', username: string, displayName: string, avatar?: string | null, id: string, isVerified: boolean }, category?: { __typename?: 'CategoryModel', title: string, slug: string, description?: string | null } | null }> };

export type FindCurrentSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type FindCurrentSessionQuery = { __typename?: 'Query', findCurrentSession: { __typename?: 'SessionModel', id: string, createdAt: string, userId: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, device: { __typename?: 'DeviceModel', browser: string, os: string, type: string }, location: { __typename?: 'LocationModel', city: string, country: string, latitude: number, longitude: number } } } };

export type FindNotificationsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindNotificationsByUserQuery = { __typename?: 'Query', findNotificationsByUser: Array<{ __typename?: 'NotificationModel', id: string, message: string, isRead: boolean, type: NotificationType, createdAt: any }> };

export type FindNotificationsUnreadCountQueryVariables = Exact<{ [key: string]: never; }>;


export type FindNotificationsUnreadCountQuery = { __typename?: 'Query', findNotificationsUnreadCount: number };

export type FindProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProfileQuery = { __typename?: 'Query', findProfile: { __typename?: 'UserProfileModel', id: string, email: string, username: string, hasPassword: boolean, displayName: string, lastUsernameChange?: any | null, lastEmailChange?: any | null, avatar?: string | null, bio?: string | null, isTotpEnabled: boolean, isVerified: boolean, isEmailVerified: boolean, notificationSettings: { __typename?: 'NotificationSettingsModel', siteNotifications: boolean, telegramNotifications: boolean }, stream: { __typename?: 'StreamModel', serverUrl?: string | null, streamKey?: string | null, isChatEnabled: boolean, isChatFollowersOnly: boolean, isChatSubscribersOnly: boolean } } };

export type FindSessionsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSessionsByUserQuery = { __typename?: 'Query', findSessionsByUser: Array<{ __typename?: 'SessionModel', id: string, createdAt: string, userId: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, device: { __typename?: 'DeviceModel', browser: string, os: string, type: string }, location: { __typename?: 'LocationModel', city: string, country: string, latitude: number, longitude: number } } }> };

export type FindSocialLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSocialLinksQuery = { __typename?: 'Query', findSocialLinks: Array<{ __typename?: 'SocialLinkModel', id: string, title: string, url: string, position: number }> };

export type GenerateTotpSecretQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateTotpSecretQuery = { __typename?: 'Query', generateTotpSecret: { __typename?: 'TotpModel', qrcodeUrl: string, secret: string } };

export type GetOAuthConnectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOAuthConnectionsQuery = { __typename?: 'Query', getOAuthConnections: Array<{ __typename?: 'OAuthAccountModel', id: string, provider: string, providerId: string, email?: string | null, createdAt: any }> };

export type GetOnlineUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOnlineUsersQuery = { __typename?: 'Query', getOnlineUsers: Array<{ __typename?: 'UserModel', id: string, username: string, lastActive: any }> };

export type ChatMessageAddedSubscriptionVariables = Exact<{
  streamId: Scalars['String']['input'];
}>;


export type ChatMessageAddedSubscription = { __typename?: 'Subscription', chatMessageAdded: { __typename?: 'ChatMessageModel', createdAt: any, text: string, user: { __typename?: 'UserModel', id: string, username: string, displayName: string } } };

export type NotificationAddedSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type NotificationAddedSubscription = { __typename?: 'Subscription', notificationAdded: { __typename?: 'NotificationModel', id: string, message: string, isRead: boolean, type: NotificationType, createdAt: any } };

export type UserStatusChangedSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserStatusChangedSubscription = { __typename?: 'Subscription', userStatusChanged: { __typename?: 'UserModel', id: string, username: string, lastActive: any } };


export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data)
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeactivateAccountDocument = gql`
    mutation DeactivateAccount($data: DeactivateAccountInput!) {
  deactivateAccount(data: $data) {
    message
    user {
      id
      isDeactivated
      deactivatedAt
    }
  }
}
    `;
export type DeactivateAccountMutationFn = Apollo.MutationFunction<DeactivateAccountMutation, DeactivateAccountMutationVariables>;

/**
 * __useDeactivateAccountMutation__
 *
 * To run a mutation, you first call `useDeactivateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateAccountMutation, { data, loading, error }] = useDeactivateAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeactivateAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeactivateAccountMutation, DeactivateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeactivateAccountMutation, DeactivateAccountMutationVariables>(DeactivateAccountDocument, options);
      }
export type DeactivateAccountMutationHookResult = ReturnType<typeof useDeactivateAccountMutation>;
export type DeactivateAccountMutationResult = Apollo.MutationResult<DeactivateAccountMutation>;
export type DeactivateAccountMutationOptions = Apollo.BaseMutationOptions<DeactivateAccountMutation, DeactivateAccountMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($data: LoginInput!) {
  loginUser(data: $data) {
    message
    user {
      username
    }
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logoutUser
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const NewPasswordDocument = gql`
    mutation NewPassword($data: NewPasswordInput!) {
  newPassword(data: $data)
}
    `;
export type NewPasswordMutationFn = Apollo.MutationFunction<NewPasswordMutation, NewPasswordMutationVariables>;

/**
 * __useNewPasswordMutation__
 *
 * To run a mutation, you first call `useNewPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newPasswordMutation, { data, loading, error }] = useNewPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useNewPasswordMutation(baseOptions?: Apollo.MutationHookOptions<NewPasswordMutation, NewPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewPasswordMutation, NewPasswordMutationVariables>(NewPasswordDocument, options);
      }
export type NewPasswordMutationHookResult = ReturnType<typeof useNewPasswordMutation>;
export type NewPasswordMutationResult = Apollo.MutationResult<NewPasswordMutation>;
export type NewPasswordMutationOptions = Apollo.BaseMutationOptions<NewPasswordMutation, NewPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($data: ResetPasswordInput!) {
  resetPassword(data: $data)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SendVerificationCodeDocument = gql`
    mutation SendVerificationCode {
  sendVerificationCode {
    message
    user {
      id
      isEmailVerified
    }
  }
}
    `;
export type SendVerificationCodeMutationFn = Apollo.MutationFunction<SendVerificationCodeMutation, SendVerificationCodeMutationVariables>;

/**
 * __useSendVerificationCodeMutation__
 *
 * To run a mutation, you first call `useSendVerificationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendVerificationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendVerificationCodeMutation, { data, loading, error }] = useSendVerificationCodeMutation({
 *   variables: {
 *   },
 * });
 */
export function useSendVerificationCodeMutation(baseOptions?: Apollo.MutationHookOptions<SendVerificationCodeMutation, SendVerificationCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendVerificationCodeMutation, SendVerificationCodeMutationVariables>(SendVerificationCodeDocument, options);
      }
export type SendVerificationCodeMutationHookResult = ReturnType<typeof useSendVerificationCodeMutation>;
export type SendVerificationCodeMutationResult = Apollo.MutationResult<SendVerificationCodeMutation>;
export type SendVerificationCodeMutationOptions = Apollo.BaseMutationOptions<SendVerificationCodeMutation, SendVerificationCodeMutationVariables>;
export const SendVerificationTokenDocument = gql`
    mutation SendVerificationToken {
  sendVerificationToken {
    message
    user {
      id
      isEmailVerified
    }
  }
}
    `;
export type SendVerificationTokenMutationFn = Apollo.MutationFunction<SendVerificationTokenMutation, SendVerificationTokenMutationVariables>;

/**
 * __useSendVerificationTokenMutation__
 *
 * To run a mutation, you first call `useSendVerificationTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendVerificationTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendVerificationTokenMutation, { data, loading, error }] = useSendVerificationTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useSendVerificationTokenMutation(baseOptions?: Apollo.MutationHookOptions<SendVerificationTokenMutation, SendVerificationTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendVerificationTokenMutation, SendVerificationTokenMutationVariables>(SendVerificationTokenDocument, options);
      }
export type SendVerificationTokenMutationHookResult = ReturnType<typeof useSendVerificationTokenMutation>;
export type SendVerificationTokenMutationResult = Apollo.MutationResult<SendVerificationTokenMutation>;
export type SendVerificationTokenMutationOptions = Apollo.BaseMutationOptions<SendVerificationTokenMutation, SendVerificationTokenMutationVariables>;
export const VerifyAccountByCodeDocument = gql`
    mutation VerifyAccountByCode($data: VerificationCodeInput!) {
  verifyAccountByCode(data: $data) {
    message
    user {
      isEmailVerified
    }
  }
}
    `;
export type VerifyAccountByCodeMutationFn = Apollo.MutationFunction<VerifyAccountByCodeMutation, VerifyAccountByCodeMutationVariables>;

/**
 * __useVerifyAccountByCodeMutation__
 *
 * To run a mutation, you first call `useVerifyAccountByCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyAccountByCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyAccountByCodeMutation, { data, loading, error }] = useVerifyAccountByCodeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVerifyAccountByCodeMutation(baseOptions?: Apollo.MutationHookOptions<VerifyAccountByCodeMutation, VerifyAccountByCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyAccountByCodeMutation, VerifyAccountByCodeMutationVariables>(VerifyAccountByCodeDocument, options);
      }
export type VerifyAccountByCodeMutationHookResult = ReturnType<typeof useVerifyAccountByCodeMutation>;
export type VerifyAccountByCodeMutationResult = Apollo.MutationResult<VerifyAccountByCodeMutation>;
export type VerifyAccountByCodeMutationOptions = Apollo.BaseMutationOptions<VerifyAccountByCodeMutation, VerifyAccountByCodeMutationVariables>;
export const VerifyAccountByLinkDocument = gql`
    mutation VerifyAccountByLink($data: VerificationTokenInput!) {
  verifyAccountByToken(data: $data) {
    message
    user {
      isEmailVerified
    }
  }
}
    `;
export type VerifyAccountByLinkMutationFn = Apollo.MutationFunction<VerifyAccountByLinkMutation, VerifyAccountByLinkMutationVariables>;

/**
 * __useVerifyAccountByLinkMutation__
 *
 * To run a mutation, you first call `useVerifyAccountByLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyAccountByLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyAccountByLinkMutation, { data, loading, error }] = useVerifyAccountByLinkMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVerifyAccountByLinkMutation(baseOptions?: Apollo.MutationHookOptions<VerifyAccountByLinkMutation, VerifyAccountByLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyAccountByLinkMutation, VerifyAccountByLinkMutationVariables>(VerifyAccountByLinkDocument, options);
      }
export type VerifyAccountByLinkMutationHookResult = ReturnType<typeof useVerifyAccountByLinkMutation>;
export type VerifyAccountByLinkMutationResult = Apollo.MutationResult<VerifyAccountByLinkMutation>;
export type VerifyAccountByLinkMutationOptions = Apollo.BaseMutationOptions<VerifyAccountByLinkMutation, VerifyAccountByLinkMutationVariables>;
export const ChangeChatSettingsDocument = gql`
    mutation ChangeChatSettings($data: ChangeChatSettingsInput!) {
  changeChatSettings(data: $data)
}
    `;
export type ChangeChatSettingsMutationFn = Apollo.MutationFunction<ChangeChatSettingsMutation, ChangeChatSettingsMutationVariables>;

/**
 * __useChangeChatSettingsMutation__
 *
 * To run a mutation, you first call `useChangeChatSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeChatSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeChatSettingsMutation, { data, loading, error }] = useChangeChatSettingsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeChatSettingsMutation(baseOptions?: Apollo.MutationHookOptions<ChangeChatSettingsMutation, ChangeChatSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeChatSettingsMutation, ChangeChatSettingsMutationVariables>(ChangeChatSettingsDocument, options);
      }
export type ChangeChatSettingsMutationHookResult = ReturnType<typeof useChangeChatSettingsMutation>;
export type ChangeChatSettingsMutationResult = Apollo.MutationResult<ChangeChatSettingsMutation>;
export type ChangeChatSettingsMutationOptions = Apollo.BaseMutationOptions<ChangeChatSettingsMutation, ChangeChatSettingsMutationVariables>;
export const SendChatMessageDocument = gql`
    mutation SendChatMessage($data: SendMessageInput!) {
  sendChatMessage(data: $data) {
    streamId
  }
}
    `;
export type SendChatMessageMutationFn = Apollo.MutationFunction<SendChatMessageMutation, SendChatMessageMutationVariables>;

/**
 * __useSendChatMessageMutation__
 *
 * To run a mutation, you first call `useSendChatMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendChatMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendChatMessageMutation, { data, loading, error }] = useSendChatMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendChatMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendChatMessageMutation, SendChatMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendChatMessageMutation, SendChatMessageMutationVariables>(SendChatMessageDocument, options);
      }
export type SendChatMessageMutationHookResult = ReturnType<typeof useSendChatMessageMutation>;
export type SendChatMessageMutationResult = Apollo.MutationResult<SendChatMessageMutation>;
export type SendChatMessageMutationOptions = Apollo.BaseMutationOptions<SendChatMessageMutation, SendChatMessageMutationVariables>;
export const FollowChannelDocument = gql`
    mutation FollowChannel($channelId: String!) {
  followChannel(channelId: $channelId)
}
    `;
export type FollowChannelMutationFn = Apollo.MutationFunction<FollowChannelMutation, FollowChannelMutationVariables>;

/**
 * __useFollowChannelMutation__
 *
 * To run a mutation, you first call `useFollowChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followChannelMutation, { data, loading, error }] = useFollowChannelMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useFollowChannelMutation(baseOptions?: Apollo.MutationHookOptions<FollowChannelMutation, FollowChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowChannelMutation, FollowChannelMutationVariables>(FollowChannelDocument, options);
      }
export type FollowChannelMutationHookResult = ReturnType<typeof useFollowChannelMutation>;
export type FollowChannelMutationResult = Apollo.MutationResult<FollowChannelMutation>;
export type FollowChannelMutationOptions = Apollo.BaseMutationOptions<FollowChannelMutation, FollowChannelMutationVariables>;
export const UnfollowChannelDocument = gql`
    mutation UnfollowChannel($channelId: String!) {
  unfollowChannel(channelId: $channelId)
}
    `;
export type UnfollowChannelMutationFn = Apollo.MutationFunction<UnfollowChannelMutation, UnfollowChannelMutationVariables>;

/**
 * __useUnfollowChannelMutation__
 *
 * To run a mutation, you first call `useUnfollowChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowChannelMutation, { data, loading, error }] = useUnfollowChannelMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useUnfollowChannelMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowChannelMutation, UnfollowChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowChannelMutation, UnfollowChannelMutationVariables>(UnfollowChannelDocument, options);
      }
export type UnfollowChannelMutationHookResult = ReturnType<typeof useUnfollowChannelMutation>;
export type UnfollowChannelMutationResult = Apollo.MutationResult<UnfollowChannelMutation>;
export type UnfollowChannelMutationOptions = Apollo.BaseMutationOptions<UnfollowChannelMutation, UnfollowChannelMutationVariables>;
export const ChangeStreamInfoDocument = gql`
    mutation ChangeStreamInfo($data: ChangeStreamInfoInput!) {
  changeStreamInfo(data: $data)
}
    `;
export type ChangeStreamInfoMutationFn = Apollo.MutationFunction<ChangeStreamInfoMutation, ChangeStreamInfoMutationVariables>;

/**
 * __useChangeStreamInfoMutation__
 *
 * To run a mutation, you first call `useChangeStreamInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeStreamInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeStreamInfoMutation, { data, loading, error }] = useChangeStreamInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeStreamInfoMutation(baseOptions?: Apollo.MutationHookOptions<ChangeStreamInfoMutation, ChangeStreamInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeStreamInfoMutation, ChangeStreamInfoMutationVariables>(ChangeStreamInfoDocument, options);
      }
export type ChangeStreamInfoMutationHookResult = ReturnType<typeof useChangeStreamInfoMutation>;
export type ChangeStreamInfoMutationResult = Apollo.MutationResult<ChangeStreamInfoMutation>;
export type ChangeStreamInfoMutationOptions = Apollo.BaseMutationOptions<ChangeStreamInfoMutation, ChangeStreamInfoMutationVariables>;
export const ChangeStreamThumbnailDocument = gql`
    mutation ChangeStreamThumbnail($thumbnail: Upload!) {
  changeStreamThumbnail(thumbnail: $thumbnail)
}
    `;
export type ChangeStreamThumbnailMutationFn = Apollo.MutationFunction<ChangeStreamThumbnailMutation, ChangeStreamThumbnailMutationVariables>;

/**
 * __useChangeStreamThumbnailMutation__
 *
 * To run a mutation, you first call `useChangeStreamThumbnailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeStreamThumbnailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeStreamThumbnailMutation, { data, loading, error }] = useChangeStreamThumbnailMutation({
 *   variables: {
 *      thumbnail: // value for 'thumbnail'
 *   },
 * });
 */
export function useChangeStreamThumbnailMutation(baseOptions?: Apollo.MutationHookOptions<ChangeStreamThumbnailMutation, ChangeStreamThumbnailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeStreamThumbnailMutation, ChangeStreamThumbnailMutationVariables>(ChangeStreamThumbnailDocument, options);
      }
export type ChangeStreamThumbnailMutationHookResult = ReturnType<typeof useChangeStreamThumbnailMutation>;
export type ChangeStreamThumbnailMutationResult = Apollo.MutationResult<ChangeStreamThumbnailMutation>;
export type ChangeStreamThumbnailMutationOptions = Apollo.BaseMutationOptions<ChangeStreamThumbnailMutation, ChangeStreamThumbnailMutationVariables>;
export const CreateIngressDocument = gql`
    mutation CreateIngress($type: Float!) {
  createIngress(ingressType: $type)
}
    `;
export type CreateIngressMutationFn = Apollo.MutationFunction<CreateIngressMutation, CreateIngressMutationVariables>;

/**
 * __useCreateIngressMutation__
 *
 * To run a mutation, you first call `useCreateIngressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIngressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIngressMutation, { data, loading, error }] = useCreateIngressMutation({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useCreateIngressMutation(baseOptions?: Apollo.MutationHookOptions<CreateIngressMutation, CreateIngressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIngressMutation, CreateIngressMutationVariables>(CreateIngressDocument, options);
      }
export type CreateIngressMutationHookResult = ReturnType<typeof useCreateIngressMutation>;
export type CreateIngressMutationResult = Apollo.MutationResult<CreateIngressMutation>;
export type CreateIngressMutationOptions = Apollo.BaseMutationOptions<CreateIngressMutation, CreateIngressMutationVariables>;
export const GenerateStreamTokenDocument = gql`
    mutation GenerateStreamToken($data: GenerateStreamTokenInput!) {
  generateStreamToken(data: $data) {
    token
  }
}
    `;
export type GenerateStreamTokenMutationFn = Apollo.MutationFunction<GenerateStreamTokenMutation, GenerateStreamTokenMutationVariables>;

/**
 * __useGenerateStreamTokenMutation__
 *
 * To run a mutation, you first call `useGenerateStreamTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateStreamTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateStreamTokenMutation, { data, loading, error }] = useGenerateStreamTokenMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGenerateStreamTokenMutation(baseOptions?: Apollo.MutationHookOptions<GenerateStreamTokenMutation, GenerateStreamTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateStreamTokenMutation, GenerateStreamTokenMutationVariables>(GenerateStreamTokenDocument, options);
      }
export type GenerateStreamTokenMutationHookResult = ReturnType<typeof useGenerateStreamTokenMutation>;
export type GenerateStreamTokenMutationResult = Apollo.MutationResult<GenerateStreamTokenMutation>;
export type GenerateStreamTokenMutationOptions = Apollo.BaseMutationOptions<GenerateStreamTokenMutation, GenerateStreamTokenMutationVariables>;
export const RemoveStreamThumbnailDocument = gql`
    mutation RemoveStreamThumbnail {
  removeStreamThumbnail
}
    `;
export type RemoveStreamThumbnailMutationFn = Apollo.MutationFunction<RemoveStreamThumbnailMutation, RemoveStreamThumbnailMutationVariables>;

/**
 * __useRemoveStreamThumbnailMutation__
 *
 * To run a mutation, you first call `useRemoveStreamThumbnailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStreamThumbnailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStreamThumbnailMutation, { data, loading, error }] = useRemoveStreamThumbnailMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveStreamThumbnailMutation(baseOptions?: Apollo.MutationHookOptions<RemoveStreamThumbnailMutation, RemoveStreamThumbnailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveStreamThumbnailMutation, RemoveStreamThumbnailMutationVariables>(RemoveStreamThumbnailDocument, options);
      }
export type RemoveStreamThumbnailMutationHookResult = ReturnType<typeof useRemoveStreamThumbnailMutation>;
export type RemoveStreamThumbnailMutationResult = Apollo.MutationResult<RemoveStreamThumbnailMutation>;
export type RemoveStreamThumbnailMutationOptions = Apollo.BaseMutationOptions<RemoveStreamThumbnailMutation, RemoveStreamThumbnailMutationVariables>;
export const ChangeEmailDocument = gql`
    mutation ChangeEmail($data: ChangeEmailInput!) {
  changeEmail(data: $data) {
    message
    user {
      id
      email
      isEmailVerified
      lastEmailChange
    }
  }
}
    `;
export type ChangeEmailMutationFn = Apollo.MutationFunction<ChangeEmailMutation, ChangeEmailMutationVariables>;

/**
 * __useChangeEmailMutation__
 *
 * To run a mutation, you first call `useChangeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEmailMutation, { data, loading, error }] = useChangeEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeEmailMutation(baseOptions?: Apollo.MutationHookOptions<ChangeEmailMutation, ChangeEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(ChangeEmailDocument, options);
      }
export type ChangeEmailMutationHookResult = ReturnType<typeof useChangeEmailMutation>;
export type ChangeEmailMutationResult = Apollo.MutationResult<ChangeEmailMutation>;
export type ChangeEmailMutationOptions = Apollo.BaseMutationOptions<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangeNotificationsSettingsDocument = gql`
    mutation ChangeNotificationsSettings($data: ChangeNotificationSettingsInput!) {
  changeNotificationSettings(data: $data) {
    notificationSettings {
      siteNotifications
      telegramNotifications
      id
    }
    telegramAuthToken
  }
}
    `;
export type ChangeNotificationsSettingsMutationFn = Apollo.MutationFunction<ChangeNotificationsSettingsMutation, ChangeNotificationsSettingsMutationVariables>;

/**
 * __useChangeNotificationsSettingsMutation__
 *
 * To run a mutation, you first call `useChangeNotificationsSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeNotificationsSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeNotificationsSettingsMutation, { data, loading, error }] = useChangeNotificationsSettingsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeNotificationsSettingsMutation(baseOptions?: Apollo.MutationHookOptions<ChangeNotificationsSettingsMutation, ChangeNotificationsSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeNotificationsSettingsMutation, ChangeNotificationsSettingsMutationVariables>(ChangeNotificationsSettingsDocument, options);
      }
export type ChangeNotificationsSettingsMutationHookResult = ReturnType<typeof useChangeNotificationsSettingsMutation>;
export type ChangeNotificationsSettingsMutationResult = Apollo.MutationResult<ChangeNotificationsSettingsMutation>;
export type ChangeNotificationsSettingsMutationOptions = Apollo.BaseMutationOptions<ChangeNotificationsSettingsMutation, ChangeNotificationsSettingsMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($data: ChangePasswordInput!) {
  changePassword(data: $data)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeProfileAvatarDocument = gql`
    mutation ChangeProfileAvatar($avatar: Upload!) {
  changeProfileAvatar(avatar: $avatar)
}
    `;
export type ChangeProfileAvatarMutationFn = Apollo.MutationFunction<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>;

/**
 * __useChangeProfileAvatarMutation__
 *
 * To run a mutation, you first call `useChangeProfileAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfileAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfileAvatarMutation, { data, loading, error }] = useChangeProfileAvatarMutation({
 *   variables: {
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useChangeProfileAvatarMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>(ChangeProfileAvatarDocument, options);
      }
export type ChangeProfileAvatarMutationHookResult = ReturnType<typeof useChangeProfileAvatarMutation>;
export type ChangeProfileAvatarMutationResult = Apollo.MutationResult<ChangeProfileAvatarMutation>;
export type ChangeProfileAvatarMutationOptions = Apollo.BaseMutationOptions<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>;
export const ChangeProfileInfoDocument = gql`
    mutation ChangeProfileInfo($data: ChangeProfileInfoInput!) {
  changeProfileInfo(data: $data)
}
    `;
export type ChangeProfileInfoMutationFn = Apollo.MutationFunction<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>;

/**
 * __useChangeProfileInfoMutation__
 *
 * To run a mutation, you first call `useChangeProfileInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfileInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfileInfoMutation, { data, loading, error }] = useChangeProfileInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeProfileInfoMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>(ChangeProfileInfoDocument, options);
      }
export type ChangeProfileInfoMutationHookResult = ReturnType<typeof useChangeProfileInfoMutation>;
export type ChangeProfileInfoMutationResult = Apollo.MutationResult<ChangeProfileInfoMutation>;
export type ChangeProfileInfoMutationOptions = Apollo.BaseMutationOptions<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>;
export const ChangeProfileUsernameDocument = gql`
    mutation ChangeProfileUsername($data: ChangeProfileUsernameInput!) {
  changeProfileUsername(data: $data)
}
    `;
export type ChangeProfileUsernameMutationFn = Apollo.MutationFunction<ChangeProfileUsernameMutation, ChangeProfileUsernameMutationVariables>;

/**
 * __useChangeProfileUsernameMutation__
 *
 * To run a mutation, you first call `useChangeProfileUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfileUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfileUsernameMutation, { data, loading, error }] = useChangeProfileUsernameMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeProfileUsernameMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProfileUsernameMutation, ChangeProfileUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProfileUsernameMutation, ChangeProfileUsernameMutationVariables>(ChangeProfileUsernameDocument, options);
      }
export type ChangeProfileUsernameMutationHookResult = ReturnType<typeof useChangeProfileUsernameMutation>;
export type ChangeProfileUsernameMutationResult = Apollo.MutationResult<ChangeProfileUsernameMutation>;
export type ChangeProfileUsernameMutationOptions = Apollo.BaseMutationOptions<ChangeProfileUsernameMutation, ChangeProfileUsernameMutationVariables>;
export const ClearSessionCookieDocument = gql`
    mutation ClearSessionCookie {
  clearSessionCookie
}
    `;
export type ClearSessionCookieMutationFn = Apollo.MutationFunction<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>;

/**
 * __useClearSessionCookieMutation__
 *
 * To run a mutation, you first call `useClearSessionCookieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearSessionCookieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearSessionCookieMutation, { data, loading, error }] = useClearSessionCookieMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearSessionCookieMutation(baseOptions?: Apollo.MutationHookOptions<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>(ClearSessionCookieDocument, options);
      }
export type ClearSessionCookieMutationHookResult = ReturnType<typeof useClearSessionCookieMutation>;
export type ClearSessionCookieMutationResult = Apollo.MutationResult<ClearSessionCookieMutation>;
export type ClearSessionCookieMutationOptions = Apollo.BaseMutationOptions<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>;
export const CreateSocialLinkDocument = gql`
    mutation CreateSocialLink($data: SocialLinkInput!) {
  createSocialLink(data: $data)
}
    `;
export type CreateSocialLinkMutationFn = Apollo.MutationFunction<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>;

/**
 * __useCreateSocialLinkMutation__
 *
 * To run a mutation, you first call `useCreateSocialLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSocialLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSocialLinkMutation, { data, loading, error }] = useCreateSocialLinkMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSocialLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>(CreateSocialLinkDocument, options);
      }
export type CreateSocialLinkMutationHookResult = ReturnType<typeof useCreateSocialLinkMutation>;
export type CreateSocialLinkMutationResult = Apollo.MutationResult<CreateSocialLinkMutation>;
export type CreateSocialLinkMutationOptions = Apollo.BaseMutationOptions<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>;
export const DisableTotpDocument = gql`
    mutation DisableTotp {
  disableTotp
}
    `;
export type DisableTotpMutationFn = Apollo.MutationFunction<DisableTotpMutation, DisableTotpMutationVariables>;

/**
 * __useDisableTotpMutation__
 *
 * To run a mutation, you first call `useDisableTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableTotpMutation, { data, loading, error }] = useDisableTotpMutation({
 *   variables: {
 *   },
 * });
 */
export function useDisableTotpMutation(baseOptions?: Apollo.MutationHookOptions<DisableTotpMutation, DisableTotpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisableTotpMutation, DisableTotpMutationVariables>(DisableTotpDocument, options);
      }
export type DisableTotpMutationHookResult = ReturnType<typeof useDisableTotpMutation>;
export type DisableTotpMutationResult = Apollo.MutationResult<DisableTotpMutation>;
export type DisableTotpMutationOptions = Apollo.BaseMutationOptions<DisableTotpMutation, DisableTotpMutationVariables>;
export const DisconnectOAuthConnectionDocument = gql`
    mutation DisconnectOAuthConnection($provider: String!, $providerId: String!) {
  disconnectOAuthConnection(provider: $provider, providerId: $providerId)
}
    `;
export type DisconnectOAuthConnectionMutationFn = Apollo.MutationFunction<DisconnectOAuthConnectionMutation, DisconnectOAuthConnectionMutationVariables>;

/**
 * __useDisconnectOAuthConnectionMutation__
 *
 * To run a mutation, you first call `useDisconnectOAuthConnectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisconnectOAuthConnectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disconnectOAuthConnectionMutation, { data, loading, error }] = useDisconnectOAuthConnectionMutation({
 *   variables: {
 *      provider: // value for 'provider'
 *      providerId: // value for 'providerId'
 *   },
 * });
 */
export function useDisconnectOAuthConnectionMutation(baseOptions?: Apollo.MutationHookOptions<DisconnectOAuthConnectionMutation, DisconnectOAuthConnectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisconnectOAuthConnectionMutation, DisconnectOAuthConnectionMutationVariables>(DisconnectOAuthConnectionDocument, options);
      }
export type DisconnectOAuthConnectionMutationHookResult = ReturnType<typeof useDisconnectOAuthConnectionMutation>;
export type DisconnectOAuthConnectionMutationResult = Apollo.MutationResult<DisconnectOAuthConnectionMutation>;
export type DisconnectOAuthConnectionMutationOptions = Apollo.BaseMutationOptions<DisconnectOAuthConnectionMutation, DisconnectOAuthConnectionMutationVariables>;
export const EnableTotpDocument = gql`
    mutation EnableTotp($data: EnableTotpInput!) {
  enableTotp(data: $data)
}
    `;
export type EnableTotpMutationFn = Apollo.MutationFunction<EnableTotpMutation, EnableTotpMutationVariables>;

/**
 * __useEnableTotpMutation__
 *
 * To run a mutation, you first call `useEnableTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableTotpMutation, { data, loading, error }] = useEnableTotpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEnableTotpMutation(baseOptions?: Apollo.MutationHookOptions<EnableTotpMutation, EnableTotpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnableTotpMutation, EnableTotpMutationVariables>(EnableTotpDocument, options);
      }
export type EnableTotpMutationHookResult = ReturnType<typeof useEnableTotpMutation>;
export type EnableTotpMutationResult = Apollo.MutationResult<EnableTotpMutation>;
export type EnableTotpMutationOptions = Apollo.BaseMutationOptions<EnableTotpMutation, EnableTotpMutationVariables>;
export const MarkNotificationsAsReadDocument = gql`
    mutation MarkNotificationsAsRead {
  markNotificationsAsRead
}
    `;
export type MarkNotificationsAsReadMutationFn = Apollo.MutationFunction<MarkNotificationsAsReadMutation, MarkNotificationsAsReadMutationVariables>;

/**
 * __useMarkNotificationsAsReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationsAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationsAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationsAsReadMutation, { data, loading, error }] = useMarkNotificationsAsReadMutation({
 *   variables: {
 *   },
 * });
 */
export function useMarkNotificationsAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkNotificationsAsReadMutation, MarkNotificationsAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkNotificationsAsReadMutation, MarkNotificationsAsReadMutationVariables>(MarkNotificationsAsReadDocument, options);
      }
export type MarkNotificationsAsReadMutationHookResult = ReturnType<typeof useMarkNotificationsAsReadMutation>;
export type MarkNotificationsAsReadMutationResult = Apollo.MutationResult<MarkNotificationsAsReadMutation>;
export type MarkNotificationsAsReadMutationOptions = Apollo.BaseMutationOptions<MarkNotificationsAsReadMutation, MarkNotificationsAsReadMutationVariables>;
export const RemoveAllOtherSessionsDocument = gql`
    mutation RemoveAllOtherSessions {
  removeAllOtherSessions
}
    `;
export type RemoveAllOtherSessionsMutationFn = Apollo.MutationFunction<RemoveAllOtherSessionsMutation, RemoveAllOtherSessionsMutationVariables>;

/**
 * __useRemoveAllOtherSessionsMutation__
 *
 * To run a mutation, you first call `useRemoveAllOtherSessionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAllOtherSessionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAllOtherSessionsMutation, { data, loading, error }] = useRemoveAllOtherSessionsMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveAllOtherSessionsMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAllOtherSessionsMutation, RemoveAllOtherSessionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveAllOtherSessionsMutation, RemoveAllOtherSessionsMutationVariables>(RemoveAllOtherSessionsDocument, options);
      }
export type RemoveAllOtherSessionsMutationHookResult = ReturnType<typeof useRemoveAllOtherSessionsMutation>;
export type RemoveAllOtherSessionsMutationResult = Apollo.MutationResult<RemoveAllOtherSessionsMutation>;
export type RemoveAllOtherSessionsMutationOptions = Apollo.BaseMutationOptions<RemoveAllOtherSessionsMutation, RemoveAllOtherSessionsMutationVariables>;
export const RemoveProfileAvatarDocument = gql`
    mutation RemoveProfileAvatar {
  removeProfileAvatar
}
    `;
export type RemoveProfileAvatarMutationFn = Apollo.MutationFunction<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>;

/**
 * __useRemoveProfileAvatarMutation__
 *
 * To run a mutation, you first call `useRemoveProfileAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProfileAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProfileAvatarMutation, { data, loading, error }] = useRemoveProfileAvatarMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveProfileAvatarMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>(RemoveProfileAvatarDocument, options);
      }
export type RemoveProfileAvatarMutationHookResult = ReturnType<typeof useRemoveProfileAvatarMutation>;
export type RemoveProfileAvatarMutationResult = Apollo.MutationResult<RemoveProfileAvatarMutation>;
export type RemoveProfileAvatarMutationOptions = Apollo.BaseMutationOptions<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>;
export const RemoveSessionDocument = gql`
    mutation RemoveSession($id: String!) {
  removeSession(id: $id)
}
    `;
export type RemoveSessionMutationFn = Apollo.MutationFunction<RemoveSessionMutation, RemoveSessionMutationVariables>;

/**
 * __useRemoveSessionMutation__
 *
 * To run a mutation, you first call `useRemoveSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSessionMutation, { data, loading, error }] = useRemoveSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSessionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSessionMutation, RemoveSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSessionMutation, RemoveSessionMutationVariables>(RemoveSessionDocument, options);
      }
export type RemoveSessionMutationHookResult = ReturnType<typeof useRemoveSessionMutation>;
export type RemoveSessionMutationResult = Apollo.MutationResult<RemoveSessionMutation>;
export type RemoveSessionMutationOptions = Apollo.BaseMutationOptions<RemoveSessionMutation, RemoveSessionMutationVariables>;
export const RemoveSocialLinkDocument = gql`
    mutation RemoveSocialLink($id: String!) {
  removeSocialLink(id: $id)
}
    `;
export type RemoveSocialLinkMutationFn = Apollo.MutationFunction<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>;

/**
 * __useRemoveSocialLinkMutation__
 *
 * To run a mutation, you first call `useRemoveSocialLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSocialLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSocialLinkMutation, { data, loading, error }] = useRemoveSocialLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSocialLinkMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>(RemoveSocialLinkDocument, options);
      }
export type RemoveSocialLinkMutationHookResult = ReturnType<typeof useRemoveSocialLinkMutation>;
export type RemoveSocialLinkMutationResult = Apollo.MutationResult<RemoveSocialLinkMutation>;
export type RemoveSocialLinkMutationOptions = Apollo.BaseMutationOptions<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>;
export const ReorderSocialLinksDocument = gql`
    mutation ReorderSocialLinks($list: [SocialLinkOrderInput!]!) {
  reorderSocialLinks(list: $list)
}
    `;
export type ReorderSocialLinksMutationFn = Apollo.MutationFunction<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>;

/**
 * __useReorderSocialLinksMutation__
 *
 * To run a mutation, you first call `useReorderSocialLinksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReorderSocialLinksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reorderSocialLinksMutation, { data, loading, error }] = useReorderSocialLinksMutation({
 *   variables: {
 *      list: // value for 'list'
 *   },
 * });
 */
export function useReorderSocialLinksMutation(baseOptions?: Apollo.MutationHookOptions<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>(ReorderSocialLinksDocument, options);
      }
export type ReorderSocialLinksMutationHookResult = ReturnType<typeof useReorderSocialLinksMutation>;
export type ReorderSocialLinksMutationResult = Apollo.MutationResult<ReorderSocialLinksMutation>;
export type ReorderSocialLinksMutationOptions = Apollo.BaseMutationOptions<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>;
export const SendUserPresenceHeartbeatDocument = gql`
    mutation SendUserPresenceHeartbeat {
  sendUserPresenceHeartbeat
}
    `;
export type SendUserPresenceHeartbeatMutationFn = Apollo.MutationFunction<SendUserPresenceHeartbeatMutation, SendUserPresenceHeartbeatMutationVariables>;

/**
 * __useSendUserPresenceHeartbeatMutation__
 *
 * To run a mutation, you first call `useSendUserPresenceHeartbeatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendUserPresenceHeartbeatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendUserPresenceHeartbeatMutation, { data, loading, error }] = useSendUserPresenceHeartbeatMutation({
 *   variables: {
 *   },
 * });
 */
export function useSendUserPresenceHeartbeatMutation(baseOptions?: Apollo.MutationHookOptions<SendUserPresenceHeartbeatMutation, SendUserPresenceHeartbeatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendUserPresenceHeartbeatMutation, SendUserPresenceHeartbeatMutationVariables>(SendUserPresenceHeartbeatDocument, options);
      }
export type SendUserPresenceHeartbeatMutationHookResult = ReturnType<typeof useSendUserPresenceHeartbeatMutation>;
export type SendUserPresenceHeartbeatMutationResult = Apollo.MutationResult<SendUserPresenceHeartbeatMutation>;
export type SendUserPresenceHeartbeatMutationOptions = Apollo.BaseMutationOptions<SendUserPresenceHeartbeatMutation, SendUserPresenceHeartbeatMutationVariables>;
export const UpdateSocialLinkDocument = gql`
    mutation UpdateSocialLink($id: String!, $data: SocialLinkInput!) {
  updateSocialLink(id: $id, data: $data)
}
    `;
export type UpdateSocialLinkMutationFn = Apollo.MutationFunction<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>;

/**
 * __useUpdateSocialLinkMutation__
 *
 * To run a mutation, you first call `useUpdateSocialLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSocialLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSocialLinkMutation, { data, loading, error }] = useUpdateSocialLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSocialLinkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>(UpdateSocialLinkDocument, options);
      }
export type UpdateSocialLinkMutationHookResult = ReturnType<typeof useUpdateSocialLinkMutation>;
export type UpdateSocialLinkMutationResult = Apollo.MutationResult<UpdateSocialLinkMutation>;
export type UpdateSocialLinkMutationOptions = Apollo.BaseMutationOptions<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>;
export const FindAllCategoriesDocument = gql`
    query FindAllCategories {
  findAllCategories {
    id
    title
    description
    slug
    createdAt
    thumbnailUrl
    tags {
      tag {
        id
        name
      }
    }
    updatedAt
  }
}
    `;

/**
 * __useFindAllCategoriesQuery__
 *
 * To run a query within a React component, call `useFindAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>(FindAllCategoriesDocument, options);
      }
export function useFindAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>(FindAllCategoriesDocument, options);
        }
export function useFindAllCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>(FindAllCategoriesDocument, options);
        }
export type FindAllCategoriesQueryHookResult = ReturnType<typeof useFindAllCategoriesQuery>;
export type FindAllCategoriesLazyQueryHookResult = ReturnType<typeof useFindAllCategoriesLazyQuery>;
export type FindAllCategoriesSuspenseQueryHookResult = ReturnType<typeof useFindAllCategoriesSuspenseQuery>;
export type FindAllCategoriesQueryResult = Apollo.QueryResult<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>;
export const FindCategoryBySlugDocument = gql`
    query FindCategoryBySlug($slug: String!) {
  findCategoryBySlug(slug: $slug) {
    id
    title
    thumbnailUrl
    description
    createdAt
    tags {
      tag {
        id
        name
      }
    }
    streams {
      id
      title
      thumbnailUrl
      isLive
      user {
        username
        displayName
        avatar
        id
        isVerified
      }
      category {
        title
        slug
        description
      }
      tags {
        tag {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useFindCategoryBySlugQuery__
 *
 * To run a query within a React component, call `useFindCategoryBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCategoryBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCategoryBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useFindCategoryBySlugQuery(baseOptions: Apollo.QueryHookOptions<FindCategoryBySlugQuery, FindCategoryBySlugQueryVariables> & ({ variables: FindCategoryBySlugQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCategoryBySlugQuery, FindCategoryBySlugQueryVariables>(FindCategoryBySlugDocument, options);
      }
export function useFindCategoryBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCategoryBySlugQuery, FindCategoryBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCategoryBySlugQuery, FindCategoryBySlugQueryVariables>(FindCategoryBySlugDocument, options);
        }
export function useFindCategoryBySlugSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindCategoryBySlugQuery, FindCategoryBySlugQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindCategoryBySlugQuery, FindCategoryBySlugQueryVariables>(FindCategoryBySlugDocument, options);
        }
export type FindCategoryBySlugQueryHookResult = ReturnType<typeof useFindCategoryBySlugQuery>;
export type FindCategoryBySlugLazyQueryHookResult = ReturnType<typeof useFindCategoryBySlugLazyQuery>;
export type FindCategoryBySlugSuspenseQueryHookResult = ReturnType<typeof useFindCategoryBySlugSuspenseQuery>;
export type FindCategoryBySlugQueryResult = Apollo.QueryResult<FindCategoryBySlugQuery, FindCategoryBySlugQueryVariables>;
export const FindRandomCategoriesDocument = gql`
    query FindRandomCategories {
  findRandomCategories {
    id
    title
    description
    slug
    createdAt
    tags {
      tag {
        id
        name
      }
    }
    thumbnailUrl
  }
}
    `;

/**
 * __useFindRandomCategoriesQuery__
 *
 * To run a query within a React component, call `useFindRandomCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRandomCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRandomCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindRandomCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<FindRandomCategoriesQuery, FindRandomCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRandomCategoriesQuery, FindRandomCategoriesQueryVariables>(FindRandomCategoriesDocument, options);
      }
export function useFindRandomCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRandomCategoriesQuery, FindRandomCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRandomCategoriesQuery, FindRandomCategoriesQueryVariables>(FindRandomCategoriesDocument, options);
        }
export function useFindRandomCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindRandomCategoriesQuery, FindRandomCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindRandomCategoriesQuery, FindRandomCategoriesQueryVariables>(FindRandomCategoriesDocument, options);
        }
export type FindRandomCategoriesQueryHookResult = ReturnType<typeof useFindRandomCategoriesQuery>;
export type FindRandomCategoriesLazyQueryHookResult = ReturnType<typeof useFindRandomCategoriesLazyQuery>;
export type FindRandomCategoriesSuspenseQueryHookResult = ReturnType<typeof useFindRandomCategoriesSuspenseQuery>;
export type FindRandomCategoriesQueryResult = Apollo.QueryResult<FindRandomCategoriesQuery, FindRandomCategoriesQueryVariables>;
export const FindRecommendedChannelsDocument = gql`
    query FindRecommendedChannels {
  findRecommendedChannels {
    id
    username
    displayName
    avatar
    isVerified
    stream {
      isLive
    }
  }
}
    `;

/**
 * __useFindRecommendedChannelsQuery__
 *
 * To run a query within a React component, call `useFindRecommendedChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRecommendedChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRecommendedChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindRecommendedChannelsQuery(baseOptions?: Apollo.QueryHookOptions<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>(FindRecommendedChannelsDocument, options);
      }
export function useFindRecommendedChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>(FindRecommendedChannelsDocument, options);
        }
export function useFindRecommendedChannelsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>(FindRecommendedChannelsDocument, options);
        }
export type FindRecommendedChannelsQueryHookResult = ReturnType<typeof useFindRecommendedChannelsQuery>;
export type FindRecommendedChannelsLazyQueryHookResult = ReturnType<typeof useFindRecommendedChannelsLazyQuery>;
export type FindRecommendedChannelsSuspenseQueryHookResult = ReturnType<typeof useFindRecommendedChannelsSuspenseQuery>;
export type FindRecommendedChannelsQueryResult = Apollo.QueryResult<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>;
export const FindChatMessagesByStreamDocument = gql`
    query FindChatMessagesByStream($streamId: String!) {
  findChatMessagesByStream(streamId: $streamId) {
    createdAt
    text
    user {
      id
      username
      displayName
    }
  }
}
    `;

/**
 * __useFindChatMessagesByStreamQuery__
 *
 * To run a query within a React component, call `useFindChatMessagesByStreamQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindChatMessagesByStreamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindChatMessagesByStreamQuery({
 *   variables: {
 *      streamId: // value for 'streamId'
 *   },
 * });
 */
export function useFindChatMessagesByStreamQuery(baseOptions: Apollo.QueryHookOptions<FindChatMessagesByStreamQuery, FindChatMessagesByStreamQueryVariables> & ({ variables: FindChatMessagesByStreamQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindChatMessagesByStreamQuery, FindChatMessagesByStreamQueryVariables>(FindChatMessagesByStreamDocument, options);
      }
export function useFindChatMessagesByStreamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindChatMessagesByStreamQuery, FindChatMessagesByStreamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindChatMessagesByStreamQuery, FindChatMessagesByStreamQueryVariables>(FindChatMessagesByStreamDocument, options);
        }
export function useFindChatMessagesByStreamSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindChatMessagesByStreamQuery, FindChatMessagesByStreamQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindChatMessagesByStreamQuery, FindChatMessagesByStreamQueryVariables>(FindChatMessagesByStreamDocument, options);
        }
export type FindChatMessagesByStreamQueryHookResult = ReturnType<typeof useFindChatMessagesByStreamQuery>;
export type FindChatMessagesByStreamLazyQueryHookResult = ReturnType<typeof useFindChatMessagesByStreamLazyQuery>;
export type FindChatMessagesByStreamSuspenseQueryHookResult = ReturnType<typeof useFindChatMessagesByStreamSuspenseQuery>;
export type FindChatMessagesByStreamQueryResult = Apollo.QueryResult<FindChatMessagesByStreamQuery, FindChatMessagesByStreamQueryVariables>;
export const FindMyFollowersDocument = gql`
    query FindMyFollowers {
  findMyFollowers {
    createdAt
    follower {
      id
      username
      displayName
      avatar
      isVerified
    }
  }
}
    `;

/**
 * __useFindMyFollowersQuery__
 *
 * To run a query within a React component, call `useFindMyFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMyFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMyFollowersQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindMyFollowersQuery(baseOptions?: Apollo.QueryHookOptions<FindMyFollowersQuery, FindMyFollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMyFollowersQuery, FindMyFollowersQueryVariables>(FindMyFollowersDocument, options);
      }
export function useFindMyFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMyFollowersQuery, FindMyFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMyFollowersQuery, FindMyFollowersQueryVariables>(FindMyFollowersDocument, options);
        }
export function useFindMyFollowersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMyFollowersQuery, FindMyFollowersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMyFollowersQuery, FindMyFollowersQueryVariables>(FindMyFollowersDocument, options);
        }
export type FindMyFollowersQueryHookResult = ReturnType<typeof useFindMyFollowersQuery>;
export type FindMyFollowersLazyQueryHookResult = ReturnType<typeof useFindMyFollowersLazyQuery>;
export type FindMyFollowersSuspenseQueryHookResult = ReturnType<typeof useFindMyFollowersSuspenseQuery>;
export type FindMyFollowersQueryResult = Apollo.QueryResult<FindMyFollowersQuery, FindMyFollowersQueryVariables>;
export const FindMyFollowingsDocument = gql`
    query FindMyFollowings {
  findMyFollowings {
    id
    createdAt
    followingId
  }
}
    `;

/**
 * __useFindMyFollowingsQuery__
 *
 * To run a query within a React component, call `useFindMyFollowingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMyFollowingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMyFollowingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindMyFollowingsQuery(baseOptions?: Apollo.QueryHookOptions<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>(FindMyFollowingsDocument, options);
      }
export function useFindMyFollowingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>(FindMyFollowingsDocument, options);
        }
export function useFindMyFollowingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>(FindMyFollowingsDocument, options);
        }
export type FindMyFollowingsQueryHookResult = ReturnType<typeof useFindMyFollowingsQuery>;
export type FindMyFollowingsLazyQueryHookResult = ReturnType<typeof useFindMyFollowingsLazyQuery>;
export type FindMyFollowingsSuspenseQueryHookResult = ReturnType<typeof useFindMyFollowingsSuspenseQuery>;
export type FindMyFollowingsQueryResult = Apollo.QueryResult<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>;
export const FindAllStreamsDocument = gql`
    query FindAllStreams($filters: FiltersInput!) {
  findAllStreams(filters: $filters) {
    id
    title
    thumbnailUrl
    isLive
    tags {
      tag {
        id
        name
      }
    }
    user {
      username
      displayName
      avatar
      id
      isVerified
    }
    category {
      title
      slug
      description
    }
  }
}
    `;

/**
 * __useFindAllStreamsQuery__
 *
 * To run a query within a React component, call `useFindAllStreamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllStreamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllStreamsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useFindAllStreamsQuery(baseOptions: Apollo.QueryHookOptions<FindAllStreamsQuery, FindAllStreamsQueryVariables> & ({ variables: FindAllStreamsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllStreamsQuery, FindAllStreamsQueryVariables>(FindAllStreamsDocument, options);
      }
export function useFindAllStreamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllStreamsQuery, FindAllStreamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllStreamsQuery, FindAllStreamsQueryVariables>(FindAllStreamsDocument, options);
        }
export function useFindAllStreamsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllStreamsQuery, FindAllStreamsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllStreamsQuery, FindAllStreamsQueryVariables>(FindAllStreamsDocument, options);
        }
export type FindAllStreamsQueryHookResult = ReturnType<typeof useFindAllStreamsQuery>;
export type FindAllStreamsLazyQueryHookResult = ReturnType<typeof useFindAllStreamsLazyQuery>;
export type FindAllStreamsSuspenseQueryHookResult = ReturnType<typeof useFindAllStreamsSuspenseQuery>;
export type FindAllStreamsQueryResult = Apollo.QueryResult<FindAllStreamsQuery, FindAllStreamsQueryVariables>;
export const FindAllStreamsByUsernameDocument = gql`
    query FindAllStreamsByUsername($filters: UsernameFiltersInput!) {
  findAllStreamsByUsername(filters: $filters) {
    id
    user {
      displayName
      username
      avatar
      id
    }
    category {
      title
    }
  }
}
    `;

/**
 * __useFindAllStreamsByUsernameQuery__
 *
 * To run a query within a React component, call `useFindAllStreamsByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllStreamsByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllStreamsByUsernameQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useFindAllStreamsByUsernameQuery(baseOptions: Apollo.QueryHookOptions<FindAllStreamsByUsernameQuery, FindAllStreamsByUsernameQueryVariables> & ({ variables: FindAllStreamsByUsernameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllStreamsByUsernameQuery, FindAllStreamsByUsernameQueryVariables>(FindAllStreamsByUsernameDocument, options);
      }
export function useFindAllStreamsByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllStreamsByUsernameQuery, FindAllStreamsByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllStreamsByUsernameQuery, FindAllStreamsByUsernameQueryVariables>(FindAllStreamsByUsernameDocument, options);
        }
export function useFindAllStreamsByUsernameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllStreamsByUsernameQuery, FindAllStreamsByUsernameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllStreamsByUsernameQuery, FindAllStreamsByUsernameQueryVariables>(FindAllStreamsByUsernameDocument, options);
        }
export type FindAllStreamsByUsernameQueryHookResult = ReturnType<typeof useFindAllStreamsByUsernameQuery>;
export type FindAllStreamsByUsernameLazyQueryHookResult = ReturnType<typeof useFindAllStreamsByUsernameLazyQuery>;
export type FindAllStreamsByUsernameSuspenseQueryHookResult = ReturnType<typeof useFindAllStreamsByUsernameSuspenseQuery>;
export type FindAllStreamsByUsernameQueryResult = Apollo.QueryResult<FindAllStreamsByUsernameQuery, FindAllStreamsByUsernameQueryVariables>;
export const FindChannelByUsernameDocument = gql`
    query FindChannelByUsername($username: String!) {
  findChannelByUsername(username: $username) {
    id
    username
    displayName
    avatar
    bio
    isVerified
    lastActive
    socialLinks {
      id
      title
      url
    }
    stream {
      id
      title
      thumbnailUrl
      isLive
      isChatEnabled
      isChatFollowersOnly
      isChatSubscribersOnly
      tags {
        tag {
          id
          name
        }
      }
      category {
        id
        title
      }
    }
    followings {
      id
    }
  }
}
    `;

/**
 * __useFindChannelByUsernameQuery__
 *
 * To run a query within a React component, call `useFindChannelByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindChannelByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindChannelByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFindChannelByUsernameQuery(baseOptions: Apollo.QueryHookOptions<FindChannelByUsernameQuery, FindChannelByUsernameQueryVariables> & ({ variables: FindChannelByUsernameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindChannelByUsernameQuery, FindChannelByUsernameQueryVariables>(FindChannelByUsernameDocument, options);
      }
export function useFindChannelByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindChannelByUsernameQuery, FindChannelByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindChannelByUsernameQuery, FindChannelByUsernameQueryVariables>(FindChannelByUsernameDocument, options);
        }
export function useFindChannelByUsernameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindChannelByUsernameQuery, FindChannelByUsernameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindChannelByUsernameQuery, FindChannelByUsernameQueryVariables>(FindChannelByUsernameDocument, options);
        }
export type FindChannelByUsernameQueryHookResult = ReturnType<typeof useFindChannelByUsernameQuery>;
export type FindChannelByUsernameLazyQueryHookResult = ReturnType<typeof useFindChannelByUsernameLazyQuery>;
export type FindChannelByUsernameSuspenseQueryHookResult = ReturnType<typeof useFindChannelByUsernameSuspenseQuery>;
export type FindChannelByUsernameQueryResult = Apollo.QueryResult<FindChannelByUsernameQuery, FindChannelByUsernameQueryVariables>;
export const FindRandomStreamsDocument = gql`
    query FindRandomStreams {
  findRandomStreams {
    id
    title
    thumbnailUrl
    isLive
    tags {
      tag {
        id
        name
      }
    }
    user {
      username
      displayName
      avatar
      id
      isVerified
    }
    category {
      title
      slug
      description
    }
  }
}
    `;

/**
 * __useFindRandomStreamsQuery__
 *
 * To run a query within a React component, call `useFindRandomStreamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRandomStreamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRandomStreamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindRandomStreamsQuery(baseOptions?: Apollo.QueryHookOptions<FindRandomStreamsQuery, FindRandomStreamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRandomStreamsQuery, FindRandomStreamsQueryVariables>(FindRandomStreamsDocument, options);
      }
export function useFindRandomStreamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRandomStreamsQuery, FindRandomStreamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRandomStreamsQuery, FindRandomStreamsQueryVariables>(FindRandomStreamsDocument, options);
        }
export function useFindRandomStreamsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindRandomStreamsQuery, FindRandomStreamsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindRandomStreamsQuery, FindRandomStreamsQueryVariables>(FindRandomStreamsDocument, options);
        }
export type FindRandomStreamsQueryHookResult = ReturnType<typeof useFindRandomStreamsQuery>;
export type FindRandomStreamsLazyQueryHookResult = ReturnType<typeof useFindRandomStreamsLazyQuery>;
export type FindRandomStreamsSuspenseQueryHookResult = ReturnType<typeof useFindRandomStreamsSuspenseQuery>;
export type FindRandomStreamsQueryResult = Apollo.QueryResult<FindRandomStreamsQuery, FindRandomStreamsQueryVariables>;
export const FindCurrentSessionDocument = gql`
    query FindCurrentSession {
  findCurrentSession {
    id
    createdAt
    userId
    metadata {
      ip
      device {
        browser
        os
        type
      }
      location {
        city
        country
        latitude
        longitude
      }
    }
  }
}
    `;

/**
 * __useFindCurrentSessionQuery__
 *
 * To run a query within a React component, call `useFindCurrentSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCurrentSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCurrentSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindCurrentSessionQuery(baseOptions?: Apollo.QueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
      }
export function useFindCurrentSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
        }
export function useFindCurrentSessionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
        }
export type FindCurrentSessionQueryHookResult = ReturnType<typeof useFindCurrentSessionQuery>;
export type FindCurrentSessionLazyQueryHookResult = ReturnType<typeof useFindCurrentSessionLazyQuery>;
export type FindCurrentSessionSuspenseQueryHookResult = ReturnType<typeof useFindCurrentSessionSuspenseQuery>;
export type FindCurrentSessionQueryResult = Apollo.QueryResult<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>;
export const FindNotificationsByUserDocument = gql`
    query FindNotificationsByUser {
  findNotificationsByUser {
    id
    message
    isRead
    type
    createdAt
  }
}
    `;

/**
 * __useFindNotificationsByUserQuery__
 *
 * To run a query within a React component, call `useFindNotificationsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindNotificationsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindNotificationsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindNotificationsByUserQuery(baseOptions?: Apollo.QueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>(FindNotificationsByUserDocument, options);
      }
export function useFindNotificationsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>(FindNotificationsByUserDocument, options);
        }
export function useFindNotificationsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>(FindNotificationsByUserDocument, options);
        }
export type FindNotificationsByUserQueryHookResult = ReturnType<typeof useFindNotificationsByUserQuery>;
export type FindNotificationsByUserLazyQueryHookResult = ReturnType<typeof useFindNotificationsByUserLazyQuery>;
export type FindNotificationsByUserSuspenseQueryHookResult = ReturnType<typeof useFindNotificationsByUserSuspenseQuery>;
export type FindNotificationsByUserQueryResult = Apollo.QueryResult<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>;
export const FindNotificationsUnreadCountDocument = gql`
    query FindNotificationsUnreadCount {
  findNotificationsUnreadCount
}
    `;

/**
 * __useFindNotificationsUnreadCountQuery__
 *
 * To run a query within a React component, call `useFindNotificationsUnreadCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindNotificationsUnreadCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindNotificationsUnreadCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindNotificationsUnreadCountQuery(baseOptions?: Apollo.QueryHookOptions<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>(FindNotificationsUnreadCountDocument, options);
      }
export function useFindNotificationsUnreadCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>(FindNotificationsUnreadCountDocument, options);
        }
export function useFindNotificationsUnreadCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>(FindNotificationsUnreadCountDocument, options);
        }
export type FindNotificationsUnreadCountQueryHookResult = ReturnType<typeof useFindNotificationsUnreadCountQuery>;
export type FindNotificationsUnreadCountLazyQueryHookResult = ReturnType<typeof useFindNotificationsUnreadCountLazyQuery>;
export type FindNotificationsUnreadCountSuspenseQueryHookResult = ReturnType<typeof useFindNotificationsUnreadCountSuspenseQuery>;
export type FindNotificationsUnreadCountQueryResult = Apollo.QueryResult<FindNotificationsUnreadCountQuery, FindNotificationsUnreadCountQueryVariables>;
export const FindProfileDocument = gql`
    query FindProfile {
  findProfile {
    id
    email
    username
    hasPassword
    displayName
    lastUsernameChange
    lastEmailChange
    avatar
    bio
    isTotpEnabled
    isVerified
    isEmailVerified
    notificationSettings {
      siteNotifications
      telegramNotifications
    }
    stream {
      serverUrl
      streamKey
      isChatEnabled
      isChatFollowersOnly
      isChatSubscribersOnly
    }
  }
}
    `;

/**
 * __useFindProfileQuery__
 *
 * To run a query within a React component, call `useFindProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindProfileQuery(baseOptions?: Apollo.QueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
      }
export function useFindProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
        }
export function useFindProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
        }
export type FindProfileQueryHookResult = ReturnType<typeof useFindProfileQuery>;
export type FindProfileLazyQueryHookResult = ReturnType<typeof useFindProfileLazyQuery>;
export type FindProfileSuspenseQueryHookResult = ReturnType<typeof useFindProfileSuspenseQuery>;
export type FindProfileQueryResult = Apollo.QueryResult<FindProfileQuery, FindProfileQueryVariables>;
export const FindSessionsByUserDocument = gql`
    query FindSessionsByUser {
  findSessionsByUser {
    id
    createdAt
    userId
    metadata {
      ip
      device {
        browser
        os
        type
      }
      location {
        city
        country
        latitude
        longitude
      }
    }
  }
}
    `;

/**
 * __useFindSessionsByUserQuery__
 *
 * To run a query within a React component, call `useFindSessionsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSessionsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSessionsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindSessionsByUserQuery(baseOptions?: Apollo.QueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
      }
export function useFindSessionsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
        }
export function useFindSessionsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
        }
export type FindSessionsByUserQueryHookResult = ReturnType<typeof useFindSessionsByUserQuery>;
export type FindSessionsByUserLazyQueryHookResult = ReturnType<typeof useFindSessionsByUserLazyQuery>;
export type FindSessionsByUserSuspenseQueryHookResult = ReturnType<typeof useFindSessionsByUserSuspenseQuery>;
export type FindSessionsByUserQueryResult = Apollo.QueryResult<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>;
export const FindSocialLinksDocument = gql`
    query FindSocialLinks {
  findSocialLinks {
    id
    title
    url
    position
  }
}
    `;

/**
 * __useFindSocialLinksQuery__
 *
 * To run a query within a React component, call `useFindSocialLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSocialLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSocialLinksQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindSocialLinksQuery(baseOptions?: Apollo.QueryHookOptions<FindSocialLinksQuery, FindSocialLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSocialLinksQuery, FindSocialLinksQueryVariables>(FindSocialLinksDocument, options);
      }
export function useFindSocialLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSocialLinksQuery, FindSocialLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSocialLinksQuery, FindSocialLinksQueryVariables>(FindSocialLinksDocument, options);
        }
export function useFindSocialLinksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindSocialLinksQuery, FindSocialLinksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindSocialLinksQuery, FindSocialLinksQueryVariables>(FindSocialLinksDocument, options);
        }
export type FindSocialLinksQueryHookResult = ReturnType<typeof useFindSocialLinksQuery>;
export type FindSocialLinksLazyQueryHookResult = ReturnType<typeof useFindSocialLinksLazyQuery>;
export type FindSocialLinksSuspenseQueryHookResult = ReturnType<typeof useFindSocialLinksSuspenseQuery>;
export type FindSocialLinksQueryResult = Apollo.QueryResult<FindSocialLinksQuery, FindSocialLinksQueryVariables>;
export const GenerateTotpSecretDocument = gql`
    query GenerateTotpSecret {
  generateTotpSecret {
    qrcodeUrl
    secret
  }
}
    `;

/**
 * __useGenerateTotpSecretQuery__
 *
 * To run a query within a React component, call `useGenerateTotpSecretQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateTotpSecretQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateTotpSecretQuery({
 *   variables: {
 *   },
 * });
 */
export function useGenerateTotpSecretQuery(baseOptions?: Apollo.QueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
      }
export function useGenerateTotpSecretLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
        }
export function useGenerateTotpSecretSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
        }
export type GenerateTotpSecretQueryHookResult = ReturnType<typeof useGenerateTotpSecretQuery>;
export type GenerateTotpSecretLazyQueryHookResult = ReturnType<typeof useGenerateTotpSecretLazyQuery>;
export type GenerateTotpSecretSuspenseQueryHookResult = ReturnType<typeof useGenerateTotpSecretSuspenseQuery>;
export type GenerateTotpSecretQueryResult = Apollo.QueryResult<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>;
export const GetOAuthConnectionsDocument = gql`
    query GetOAuthConnections {
  getOAuthConnections {
    id
    provider
    providerId
    email
    createdAt
  }
}
    `;

/**
 * __useGetOAuthConnectionsQuery__
 *
 * To run a query within a React component, call `useGetOAuthConnectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOAuthConnectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOAuthConnectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOAuthConnectionsQuery(baseOptions?: Apollo.QueryHookOptions<GetOAuthConnectionsQuery, GetOAuthConnectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOAuthConnectionsQuery, GetOAuthConnectionsQueryVariables>(GetOAuthConnectionsDocument, options);
      }
export function useGetOAuthConnectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOAuthConnectionsQuery, GetOAuthConnectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOAuthConnectionsQuery, GetOAuthConnectionsQueryVariables>(GetOAuthConnectionsDocument, options);
        }
export function useGetOAuthConnectionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOAuthConnectionsQuery, GetOAuthConnectionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOAuthConnectionsQuery, GetOAuthConnectionsQueryVariables>(GetOAuthConnectionsDocument, options);
        }
export type GetOAuthConnectionsQueryHookResult = ReturnType<typeof useGetOAuthConnectionsQuery>;
export type GetOAuthConnectionsLazyQueryHookResult = ReturnType<typeof useGetOAuthConnectionsLazyQuery>;
export type GetOAuthConnectionsSuspenseQueryHookResult = ReturnType<typeof useGetOAuthConnectionsSuspenseQuery>;
export type GetOAuthConnectionsQueryResult = Apollo.QueryResult<GetOAuthConnectionsQuery, GetOAuthConnectionsQueryVariables>;
export const GetOnlineUsersDocument = gql`
    query GetOnlineUsers {
  getOnlineUsers {
    id
    username
    lastActive
  }
}
    `;

/**
 * __useGetOnlineUsersQuery__
 *
 * To run a query within a React component, call `useGetOnlineUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOnlineUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOnlineUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOnlineUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>(GetOnlineUsersDocument, options);
      }
export function useGetOnlineUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>(GetOnlineUsersDocument, options);
        }
export function useGetOnlineUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>(GetOnlineUsersDocument, options);
        }
export type GetOnlineUsersQueryHookResult = ReturnType<typeof useGetOnlineUsersQuery>;
export type GetOnlineUsersLazyQueryHookResult = ReturnType<typeof useGetOnlineUsersLazyQuery>;
export type GetOnlineUsersSuspenseQueryHookResult = ReturnType<typeof useGetOnlineUsersSuspenseQuery>;
export type GetOnlineUsersQueryResult = Apollo.QueryResult<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>;
export const ChatMessageAddedDocument = gql`
    subscription ChatMessageAdded($streamId: String!) {
  chatMessageAdded(streamId: $streamId) {
    createdAt
    text
    user {
      id
      username
      displayName
    }
  }
}
    `;

/**
 * __useChatMessageAddedSubscription__
 *
 * To run a query within a React component, call `useChatMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatMessageAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatMessageAddedSubscription({
 *   variables: {
 *      streamId: // value for 'streamId'
 *   },
 * });
 */
export function useChatMessageAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ChatMessageAddedSubscription, ChatMessageAddedSubscriptionVariables> & ({ variables: ChatMessageAddedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChatMessageAddedSubscription, ChatMessageAddedSubscriptionVariables>(ChatMessageAddedDocument, options);
      }
export type ChatMessageAddedSubscriptionHookResult = ReturnType<typeof useChatMessageAddedSubscription>;
export type ChatMessageAddedSubscriptionResult = Apollo.SubscriptionResult<ChatMessageAddedSubscription>;
export const NotificationAddedDocument = gql`
    subscription NotificationAdded($userId: String!) {
  notificationAdded(userId: $userId) {
    id
    message
    isRead
    type
    createdAt
  }
}
    `;

/**
 * __useNotificationAddedSubscription__
 *
 * To run a query within a React component, call `useNotificationAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationAddedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNotificationAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<NotificationAddedSubscription, NotificationAddedSubscriptionVariables> & ({ variables: NotificationAddedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NotificationAddedSubscription, NotificationAddedSubscriptionVariables>(NotificationAddedDocument, options);
      }
export type NotificationAddedSubscriptionHookResult = ReturnType<typeof useNotificationAddedSubscription>;
export type NotificationAddedSubscriptionResult = Apollo.SubscriptionResult<NotificationAddedSubscription>;
export const UserStatusChangedDocument = gql`
    subscription UserStatusChanged($userId: String!) {
  userStatusChanged(userId: $userId) {
    id
    username
    lastActive
  }
}
    `;

/**
 * __useUserStatusChangedSubscription__
 *
 * To run a query within a React component, call `useUserStatusChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserStatusChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserStatusChangedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserStatusChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<UserStatusChangedSubscription, UserStatusChangedSubscriptionVariables> & ({ variables: UserStatusChangedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserStatusChangedSubscription, UserStatusChangedSubscriptionVariables>(UserStatusChangedDocument, options);
      }
export type UserStatusChangedSubscriptionHookResult = ReturnType<typeof useUserStatusChangedSubscription>;
export type UserStatusChangedSubscriptionResult = Apollo.SubscriptionResult<UserStatusChangedSubscription>;