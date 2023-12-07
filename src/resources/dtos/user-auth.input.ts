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
  cpassword: string;
}

@InputType()
export class LoginUserParams {
  @Field(() => String)
  @IsEmail(undefined, { message: 'invalidEmail' })
  email: string;

  @Field(() => String)
  password: string;
}
