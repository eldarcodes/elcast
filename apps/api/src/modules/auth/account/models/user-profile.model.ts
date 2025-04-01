import { Field, ObjectType } from '@nestjs/graphql';

import { UserModel } from './user.model';

@ObjectType({
  description: 'User profile model',
})
export class UserProfileModel extends UserModel {
  @Field(() => Boolean)
  hasPassword: boolean;
}
