import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  SaveDoormotQuestionParams,
  SaveDoormotQuestionResponseParams,
  SaveServerDocumentParams,
  SaveUserDetailsParams,
} from './create-params';

export interface UpdateServerDocumentParams {
  id: string;
  data: Partial<SaveServerDocumentParams>;
}

export interface UpdateUserDetailsParams {
  id: string;
  data: Partial<SaveUserDetailsParams>;
}

@InputType()
class UpdateDoormotQuestionParamsData extends PartialType(
  SaveDoormotQuestionParams,
) {}
@InputType()
export class UpdateDoormotQuestionParams {
  @Field(() => String)
  id: string;

  @Field(() => UpdateDoormotQuestionParamsData)
  data: UpdateDoormotQuestionParamsData;
}

@InputType()
class UpdateDoormotQuestionResponseParamsData extends PartialType(
  SaveDoormotQuestionResponseParams,
) {}
@InputType()
export class UpdateDoormotQuestionResponseParams {
  @Field(() => String)
  id: string;

  @Field(() => UpdateDoormotQuestionResponseParamsData)
  data: UpdateDoormotQuestionResponseParamsData;
}
