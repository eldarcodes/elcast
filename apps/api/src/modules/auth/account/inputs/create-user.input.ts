import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import {
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  USERNAME_REGEX,
} from '@/src/shared/constants/account.constants';

@InputType({ description: 'Create User Input' })
export class CreateUserInput {
  @Field({
    description: 'Username of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_USERNAME_LENGTH)
  @Matches(USERNAME_REGEX)
  public username: string;

  @Field({
    description: 'Email of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @Field({
    description: 'Password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  public password: string;
}
