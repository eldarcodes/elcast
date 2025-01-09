import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ChangeChatSettingsInput {
  @Field(() => String)
  @IsBoolean()
  public isChatEnabled: boolean;

  @Field(() => String)
  @IsBoolean()
  public isChatFollowersOnly: boolean;

  @Field(() => String)
  @IsBoolean()
  public isChatSubscribersOnly: boolean;
}
