import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { ServerDocumentEntity, UserEntity } from 'resources/entities';
import { CommonCreateParams } from './commons';

export interface SaveUserDetailsParams extends Omit<UserEntity, 'id'> {}
export interface SaveServerDocumentParams
  extends Omit<ServerDocumentEntity, 'id'> {}

@InputType()
export class SaveDoormotQuestionParams extends CommonCreateParams {
  @Field(() => String)
  textEn: string;

  @Field(() => String)
  textFr: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  extraData?: any;
}
