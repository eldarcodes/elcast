import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @Field(() => String)
  @IsString()
  @IsOptional()
  public captcha: string;
}
