import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from '@/prisma/generated';

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

  @Field(() => Boolean)
  isTotpEnabled: boolean;

  @Field(() => Boolean)
  isDeactivated: boolean;

  @Field(() => Date, { nullable: true })
  deactivatedAt: Date;

  @Field(() => String, { nullable: true })
  totpSecret: string;

  @Field(() => Boolean)
  isEmailVerified: boolean;

  @Field(() => [SocialLinkModel])
  socialLinks: SocialLinkModel[];

  @Field(() => Boolean)
  isVerified: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
