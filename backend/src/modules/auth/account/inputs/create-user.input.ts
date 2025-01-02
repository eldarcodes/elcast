import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

@InputType({ description: 'Create User Import' })
export class CreateUserInput {
  @Field({
    description: 'Username of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
  public username: string;

  @Field({
    description: 'Email of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @Field({
    description: 'Password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  public password: string;
}
