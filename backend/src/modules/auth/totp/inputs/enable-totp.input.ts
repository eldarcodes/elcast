import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

import { PIN_LENGTH } from '@/src/shared/constants/account.constants';

@InputType()
export class EnableTotpInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public secret: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(PIN_LENGTH, PIN_LENGTH)
  public pin: string;
}
