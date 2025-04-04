import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Tag } from '@/prisma/generated';
import { CategoryTagModel } from '@/src/modules/category/models/category-tag.model';
import { StreamTagModel } from '@/src/modules/stream/models/stream-tag.model';

@ObjectType()
export class TagModel implements Tag {
  @Field(() => ID)
  public id: string;

  @Field(() => String)
  public name: string;

  @Field(() => [StreamTagModel])
  public streamTags: StreamTagModel[];

  @Field(() => [CategoryTagModel])
  public categoryTags: CategoryTagModel[];

  @Field(() => Date)
  public createdAt: Date;
}
