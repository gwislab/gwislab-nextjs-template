import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ELocale, ESignUpMethod, EUserGender, EUserRole } from '@prisma/client';
import { CommonEntityParams } from 'resources/dtos';

@ObjectType()
export class UserEntity extends CommonEntityParams {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  dateOfBirth?: string;

  @Field(() => String, { nullable: true })
  countryCode?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  password: string;

  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => Boolean)
  isTermsAgreed: boolean;

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

  @Field(() => ELocale)
  locale: ELocale;

  @Field(() => ESignUpMethod)
  signupMethod: ESignUpMethod;

  @Field(() => EUserGender, { nullable: true })
  gender?: EUserGender;

  @Field(() => EUserRole)
  userRole: EUserRole;

  @Field(() => Boolean)
  isEmailVerified: boolean;

  @Field(() => Boolean)
  isPhoneNumberVerified: boolean;

  @Field(() => Boolean)
  isAccountSetup: boolean;
}

@ObjectType()
export class UserResponse {
  @Field(() => String)
  message: string;

  @Field(() => UserEntity)
  payload: UserEntity;
}

@ObjectType()
export class SendVerificationCodePayload {
  @Field(() => String)
  sentTo: string;

  @Field(() => Int)
  expirationInSec: number;
}

@ObjectType()
export class SendVerificationCodeResponse {
  @Field(() => String)
  message: string;

  @Field(() => SendVerificationCodePayload)
  payload: SendVerificationCodePayload;
}

@ObjectType()
export class VerifyForgotPasswordCodePayload {
  @Field(() => String)
  email: string;

  @Field(() => String)
  verificationReference: string;
}

@ObjectType()
export class VerifyForgotPasswordCodeResponse {
  @Field(() => String)
  message: string;

  @Field(() => VerifyForgotPasswordCodePayload)
  payload: VerifyForgotPasswordCodePayload;
}
