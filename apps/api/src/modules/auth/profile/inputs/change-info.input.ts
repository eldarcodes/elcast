import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

import { MAX_BIO_LENGTH } from '@/src/shared/constants/account.constants';

@InputType()
export class ChangeProfileInfoInput {
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
