import { ObjectType, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { CommonEntityParams } from 'resources/dtos';

@ObjectType()
export class DoormotQuestionEntity extends CommonEntityParams {
  @Field(() => String)
  id: string;

  @Field(() => String)
  text: string;

  @Field(() => GraphQLJSONObject)
  extraData?: any;
}

@ObjectType()
export class SingleDoormotQuestionResponse {
  @Field(() => String)
  message: string;

  @Field(() => DoormotQuestionEntity)
  payload: DoormotQuestionEntity;
}

@ObjectType()
export class ManyDoormotQuestionResponse {
  @Field(() => String)
  message: string;

  @Field(() => [DoormotQuestionEntity])
  payload: DoormotQuestionEntity[];
}
