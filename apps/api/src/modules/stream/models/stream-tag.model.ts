import { Field, ObjectType } from '@nestjs/graphql';

import { StreamTag } from '@/prisma/generated';
import { StreamModel } from '@/src/modules/stream/models/stream.model';
import { TagModel } from '@/src/shared/models/tag.model';

@ObjectType()
export class StreamTagModel implements StreamTag {
  @Field(() => StreamModel)
  public stream: StreamModel;

  @Field(() => String)
  public streamId: string;

  @Field(() => TagModel)
  public tag: TagModel;

  @Field(() => String)
  public tagId: string;

  @Field(() => Date)
  public createdAt: Date;
}
