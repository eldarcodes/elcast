import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

@InputType({ description: 'Login input' })
export class LoginInput {
  @Field(() => String, {
    description: 'Auth login',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
  public login: string;

  @Field(() => String, {
    description: 'Auth password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  public password: string;

  @Field(() => String, {
    nullable: true,
    description: 'Auth password',
  })
  public pin?: string;
}
