import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

@InputType()
export class SocialLinkInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
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
