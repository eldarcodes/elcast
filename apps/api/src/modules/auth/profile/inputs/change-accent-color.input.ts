import { Field, InputType } from '@nestjs/graphql';
import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ChangeProfileAccentColorInput {
  @Field(() => String)
  @IsString()
  @IsHexColor()
  @IsNotEmpty()
  public accentColor: string;
}
