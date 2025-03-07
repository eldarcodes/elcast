import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

import {
  MIN_USERNAME_LENGTH,
  USERNAME_REGEX,
} from '@/src/shared/constants/account.constants';

@InputType()
export class ChangeProfileUsernameInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_USERNAME_LENGTH)
  @Matches(USERNAME_REGEX)
  public username: string;
}
