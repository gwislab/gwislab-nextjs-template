import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  SaveDoormotQuestionParams,
  SaveDoormotQuestionResponseParams,
  SaveServerDocumentParams,
} from './create-params';
import { ELocale, ESignUpMethod, EUserGender, EUserRole } from '@prisma/client';

export interface UpdateServerDocumentParams {
  id: string;
  data: Partial<SaveServerDocumentParams>;
}

@InputType()
export class UpdateUserDetailsParams {
  @Field(() => String, { nullable: true })
  dateOfBirth?: string;

  @Field(() => String, { nullable: true })
  countryCode?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => Boolean, { nullable: true })
  isTermsAgreed?: boolean;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  state?: string;

  @Field(() => String, { nullable: true })
  zip?: string;

  @Field(() => String, { nullable: true })
  profileUrl?: string;

  @Field(() => ELocale, { nullable: true })
  locale?: ELocale;

  @Field(() => ESignUpMethod, { nullable: true })
  signupMethod?: ESignUpMethod;

  @Field(() => EUserGender, { nullable: true })
  gender?: EUserGender;

  @Field(() => EUserRole, { nullable: true })
  userRole?: EUserRole;

  @Field(() => Boolean, { nullable: true })
  isEmailVerified?: boolean;

  @Field(() => Boolean, { nullable: true })
  isPhoneNumberVerified?: boolean;

  @Field(() => Boolean, { nullable: true })
  isAccountSetup?: boolean;

  password?: string;
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
