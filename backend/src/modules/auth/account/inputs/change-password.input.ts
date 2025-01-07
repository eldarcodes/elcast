import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType({ description: 'Change user password' })
export class ChangePasswordInput {
  @Field({
    description: 'Password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  public oldPassword: string;

  @Field({
    description: 'New password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  public newPassword: string;
}
