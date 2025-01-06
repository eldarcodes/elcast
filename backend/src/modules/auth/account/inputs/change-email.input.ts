import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType({ description: 'Change user E-Email' })
export class ChangeEmailInput {
  @Field({
    description: 'Email of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
