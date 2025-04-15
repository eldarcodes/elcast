import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Category } from '@/prisma/generated';

import { StreamModel } from '../../stream/models/stream.model';

import { CategoryTagModel } from './category-tag.model';

@ObjectType()
export class CategoryModel implements Category {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  thumbnailUrl: string;

  @Field(() => [StreamModel])
  streams: StreamModel[];

  @Field(() => [CategoryTagModel], { nullable: true })
  tags: CategoryTagModel[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
