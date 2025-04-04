import { Field, ObjectType } from '@nestjs/graphql';

import { CategoryTag } from '@/prisma/generated';
import { TagModel } from '@/src/shared/models/tag.model';

import { CategoryModel } from './category.model';

@ObjectType()
export class CategoryTagModel implements CategoryTag {
  @Field(() => CategoryModel)
  public category: CategoryModel;

  @Field(() => String)
  public categoryId: string;

  @Field(() => TagModel)
  public tag: TagModel;

  @Field(() => String)
  public tagId: string;

  @Field(() => Date)
  public createdAt: Date;
}
