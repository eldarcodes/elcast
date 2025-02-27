import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

@InputType({ description: 'Login input' })
export class LoginInput {
  @Field(() => String, {
    description: 'Auth login',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public login: string;

  @Field(() => String, {
    description: 'Auth password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  public password: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(6, 6)
  public pin?: string;
}
