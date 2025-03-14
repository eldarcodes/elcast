import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from '@/prisma/generated';
import { FollowModel } from '@/src/modules/follow/models/follow.model';
import { NotificationSettingsModel } from '@/src/modules/notification/models/notification-settings.model';
import { NotificationModel } from '@/src/modules/notification/models/notification.model';
import { StreamModel } from '@/src/modules/stream/models/stream.model';

import { SocialLinkModel } from '../../profile/models/social-link.model';

@ObjectType({
  description: 'User model',
})
export class UserModel implements User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  displayName: string;

  @Field(() => String, { nullable: true })
  avatar: string;

  @Field(() => String, { nullable: true })
  bio: string;

  @Field(() => String, { nullable: true })
  telegramId: string;

  @Field(() => Boolean)
  isTotpEnabled: boolean;

  @Field(() => Boolean)
  isDeactivated: boolean;

  @Field(() => Boolean)
  isOnline: boolean;

  @Field(() => Date, { nullable: true })
  deactivatedAt: Date;

  @Field(() => Date, { nullable: true })
  lastUsernameChange: Date;

  @Field(() => Date, { nullable: true })
  lastEmailChange: Date;

  @Field(() => String, { nullable: true })
  totpSecret: string;

  @Field(() => Boolean)
  isEmailVerified: boolean;

  @Field(() => [SocialLinkModel])
  socialLinks: SocialLinkModel[];

  @Field(() => StreamModel)
  stream: StreamModel;

  @Field(() => [FollowModel])
  followers: FollowModel[];

  @Field(() => [FollowModel])
  followings: FollowModel[];

  @Field(() => [NotificationModel])
  notifications: NotificationModel[];

  @Field(() => NotificationSettingsModel)
  notificationSettings: NotificationSettingsModel;

  @Field(() => Boolean)
  isVerified: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
