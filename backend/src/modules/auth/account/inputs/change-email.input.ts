import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { PIN_LENGTH } from '@/src/shared/constants/account.constants';

@InputType({ description: 'Change user E-Email' })
export class ChangeEmailInput {
  @Field({
    description: 'Email of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @Length(PIN_LENGTH, PIN_LENGTH)
  public pin?: string;
}
