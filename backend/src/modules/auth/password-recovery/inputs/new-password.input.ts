import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
  Validate,
} from 'class-validator';

import { MIN_PASSWORD_LENGTH } from '@/src/shared/constants/account.constants';
import { IsPasswordsMatchingConstraint } from '@/src/shared/decorators/is-passwords-matching-constraint.decorator';

@InputType()
export class NewPasswordInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  public password: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  @Validate(IsPasswordsMatchingConstraint)
  public passwordRepeat: string;

  @Field(() => String)
  @IsUUID('4')
  @IsNotEmpty()
  public token: string;
}
