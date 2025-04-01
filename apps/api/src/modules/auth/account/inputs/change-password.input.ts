import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

import { MIN_PASSWORD_LENGTH } from '@/src/shared/constants/account.constants';

@InputType({ description: 'Change user password' })
export class ChangePasswordInput {
  @Field({
    description: 'Password of the user',
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  @IsOptional()
  public oldPassword: string;

  @Field({
    description: 'New password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  public newPassword: string;
}
