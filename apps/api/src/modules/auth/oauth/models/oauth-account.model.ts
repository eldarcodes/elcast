import { Field, ID, ObjectType } from '@nestjs/graphql';

import { OAuthAccount } from '@/prisma/generated';
import { FollowModel } from '@/src/modules/follow/models/follow.model';
import { NotificationSettingsModel } from '@/src/modules/notification/models/notification-settings.model';
import { NotificationModel } from '@/src/modules/notification/models/notification.model';
import { StreamModel } from '@/src/modules/stream/models/stream.model';

import { UserModel } from '../../account/models/user.model';
import { SocialLinkModel } from '../../profile/models/social-link.model';

@ObjectType({
  description: 'OAuth account model',
})
export class OAuthAccountModel implements OAuthAccount {
  @Field(() => ID)
  public id: string;

  @Field(() => String)
  public provider: string;

  @Field(() => String)
  public providerId: string;

  @Field(() => UserModel)
  public user: UserModel;

  @Field(() => String)
  public userId: string;

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => Date)
  public updatedAt: Date;
}
