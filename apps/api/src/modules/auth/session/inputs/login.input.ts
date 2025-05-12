import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

import {
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  PIN_LENGTH,
} from '@/src/shared/constants/account.constants';

@InputType({ description: 'Login input' })
export class LoginInput {
  @Field(() => String, {
    description: 'Auth login',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_USERNAME_LENGTH)
  public login: string;

  @Field(() => String, {
    description: 'Auth password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  public password: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(PIN_LENGTH, PIN_LENGTH)
  public pin?: string;

  @Field(() => String)
  @IsString()
  @IsOptional()
  public captcha: string;
}
