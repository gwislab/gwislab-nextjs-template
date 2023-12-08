import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { ServerDocumentEntity, UserEntity } from 'resources/entities';
import { SaveDoormotQuestionParams } from './create-params';

@InputType()
export class FilterDoormotQuestionsParams extends PartialType(
  SaveDoormotQuestionParams,
) {
  @Field(() => String, { nullable: true })
  id?: string;
}

@InputType()
export class PaginateDoormotQuestionsParams extends PartialType(
  FilterDoormotQuestionsParams,
) {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  limit?: number;
}

@InputType()
export class FilterDoormotQuestionResponsesParams extends PartialType(
  SaveDoormotQuestionParams,
) {
  @Field(() => String, { nullable: true })
  id?: string;
}

@InputType()
export class PaginateDoormotQuestionResponsesParams extends PartialType(
  FilterDoormotQuestionResponsesParams,
) {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  limit?: number;
}

export interface FilterUserParams extends Partial<UserEntity> {}
export interface FilterServerDocumentParams
  extends Partial<ServerDocumentEntity> {}
