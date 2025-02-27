import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

import { MIN_SOCIAL_LINK_TITLE_LENGTH } from '@/src/shared/constants/account.constants';

@InputType()
export class SocialLinkInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_SOCIAL_LINK_TITLE_LENGTH)
  public title: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  public url: string;
}

@InputType()
export class SocialLinkOrderInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public id: string;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  public position: number;
}
