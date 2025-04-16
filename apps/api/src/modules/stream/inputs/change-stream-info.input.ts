import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class ChangeStreamInfoInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public title: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public categoryId: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  public tags?: string[];
}
