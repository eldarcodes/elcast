import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

import {
  MIN_PASSWORD_LENGTH,
  PIN_LENGTH,
} from '@/src/shared/constants/account.constants';

@InputType()
export class DeactivateAccountInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  public password: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @Length(PIN_LENGTH, PIN_LENGTH)
  public pin?: string;
}
