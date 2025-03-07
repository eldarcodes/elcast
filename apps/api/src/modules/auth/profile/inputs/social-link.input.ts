import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Length } from 'class-validator';

import {
  MAX_SOCIAL_LINK_TITLE_LENGTH,
  MIN_SOCIAL_LINK_TITLE_LENGTH,
} from '@/src/shared/constants/account.constants';

@InputType()
export class SocialLinkInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(MIN_SOCIAL_LINK_TITLE_LENGTH, MAX_SOCIAL_LINK_TITLE_LENGTH)
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
