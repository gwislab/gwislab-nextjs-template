import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from '@nestjs/class-validator';

@InputType()
export class SignUpUserParams {
  @Field(() => String)
  @IsEmail(undefined, { message: 'invalidEmail' })
  email: string;

  @Field(() => Boolean)
  isTermsAgreed: boolean;

  @Field(() => String)
  password: string;

  @Field(() => String)
  confirmPassword: string;
}

@InputType()
export class LoginUserParams {
  @Field(() => String)
  @IsEmail(undefined, { message: 'invalidEmail' })
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class UpdateMePasswordParams {
  @Field(() => String)
  currentPassword: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  confirmPassword: string;
}

@InputType()
export class ResetPasswordParams {
  @Field(() => String)
  @IsEmail(undefined, { message: 'invalidEmail' })
  email: string;

  @Field(() => String)
  verificationReference: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  confirmPassword: string;
}

@InputType()
export class ResendCodeParams {
  @Field(() => String)
  @IsEmail(undefined, { message: 'invalidEmail' })
  email: string;
}

@InputType()
export class VerifyForgotPasswordCodeParams {
  @Field(() => String)
  code: string;

  @Field(() => String)
  @IsEmail(undefined, { message: 'invalidEmail' })
  email: string;
}
