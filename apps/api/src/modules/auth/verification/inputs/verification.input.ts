import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

import { PIN_LENGTH } from '@/src/shared/constants/account.constants';

@InputType()
export class VerificationTokenInput {
  @Field(() => String)
  @IsUUID('4')
  @IsNotEmpty()
  public token: string;
}

@InputType()
export class VerificationCodeInput {
  @Field(() => String)
  @IsString()
  @Length(PIN_LENGTH, PIN_LENGTH)
  public code: string;
}
