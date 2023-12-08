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

@InputType()
export class SaveDoormotQuestionResponseParams extends CommonCreateParams {
  @Field(() => String)
  text: string;

  @Field(() => String)
  doormotQuestionId: string;

  userId: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  extraData?: any;
}
