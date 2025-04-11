import { Field, ID, ObjectType } from '@nestjs/graphql';

import { OAuthAccount } from '@/prisma/generated';

import { UserModel } from '../../account/models/user.model';

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

  @Field(() => String, { nullable: true })
  public email: string;

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => Date)
  public updatedAt: Date;
}
