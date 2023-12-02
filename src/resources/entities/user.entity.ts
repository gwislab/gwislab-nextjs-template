import { ObjectType, Field } from '@nestjs/graphql';
import { ELocale, ESignUpMethod, EUserGender, EUserRole } from '@prisma/client';
import { CommonCreateParams } from 'resources/dtos';

@ObjectType()
export class UserEntity extends CommonCreateParams {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

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
