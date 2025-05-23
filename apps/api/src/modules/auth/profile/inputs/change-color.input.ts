import { Field, InputType } from '@nestjs/graphql';
import { IsHexColor, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class ChangeProfileColorInput {
  @Field(() => String)
  @IsString()
  @IsHexColor()
  @IsNotEmpty()
  public color: string;
}
