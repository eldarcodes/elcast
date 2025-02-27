import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import {
  MAX_BIO_LENGTH,
  MIN_USERNAME_LENGTH,
  USERNAME_REGEX,
} from '@/src/shared/constants/account.constants';

@InputType()
export class ChangeProfileInfoInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_USERNAME_LENGTH)
  @Matches(USERNAME_REGEX)
  public username: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public displayName: string;

  @Field(() => String)
  @IsString()
  @IsOptional()
  @MaxLength(MAX_BIO_LENGTH)
  public bio?: string;
}
