import { ObjectType, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { CommonEntityParams } from 'resources/dtos';
import { DoormotQuestionEntity } from './doormot-question.entity';
import { UserEntity } from './user.entity';

@ObjectType()
export class DoormotQuestionResponseEntity extends CommonEntityParams {
  @Field(() => String)
  id: string;

  @Field(() => String)
  doormotQuestionId: string;

  @Field(() => String)
  userId: string;

  @Field(() => String, { nullable: true })
  text?: string;

  @Field(() => GraphQLJSONObject)
  extraData?: any;

  @Field(() => DoormotQuestionEntity, { nullable: true })
  doormotQuestion?: DoormotQuestionEntity;

  @Field(() => UserEntity, { nullable: true })
  user?: UserEntity;
}

@ObjectType()
export class SingleDoormotQuestionResponseResponse {
  @Field(() => String)
  message: string;

  @Field(() => DoormotQuestionResponseEntity)
  payload: DoormotQuestionResponseEntity;
}

@ObjectType()
export class ManyDoormotQuestionResponseResponse {
  @Field(() => String)
  message: string;

  @Field(() => [DoormotQuestionResponseEntity])
  payload: DoormotQuestionResponseEntity[];
}
