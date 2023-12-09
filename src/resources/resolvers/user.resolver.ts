import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Context,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import {
  UserResponse,
  UserEntity,
  SendVerificationCodeResponse,
  VerifyForgotPasswordCodeResponse,
} from 'resources/entities';
import { UserService } from 'resources/services';
import { AppErrorUtils, AppLoggerUtils } from 'utils';
import {
  LoginUserParams,
  ResendCodeParams,
  ResetPasswordParams,
  SignUpUserParams,
  UpdateMePasswordParams,
  UpdateUserDetailsParams,
  VerifyForgotPasswordCodeParams,
} from 'resources/dtos';
import { AuthGuard } from 'guards';
import { AppContext } from 'interfaces';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CacheTTL } from '@nestjs/cache-manager';
import { AppConfig } from 'config';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly logger: AppLoggerUtils,
    private readonly error: AppErrorUtils,
  ) {
    this.logger.setContext(UserResolver.name);
  }

  @Mutation(() => UserResponse)
  signupUser(
    @I18n() i18n: I18nContext,
    @Args('signupUserInput') signupUserInput: SignUpUserParams,
  ) {
    try {
      return this.userService.signup(signupUserInput, i18n);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserResponse)
  updateUserDetails(
    @I18n() i18n: I18nContext,
    @Args('updateUserInput') updateUserInput: UpdateUserDetailsParams,
    @Context() { req }: AppContext,
  ) {
    try {
      const { user } = req;
      return this.userService.update(updateUserInput, user, i18n);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @CacheTTL(AppConfig.emailJwtExpiryInSec)
  @UseGuards(AuthGuard)
  @Mutation(() => UserResponse)
  resendEmailVerificationLink(
    @I18n() i18n: I18nContext,
    @Context() { req }: AppContext,
  ) {
    try {
      const { user } = req;
      return this.userService.resendVerificationLink(user, i18n);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @Mutation(() => UserResponse)
  loginUser(
    @I18n() i18n: I18nContext,
    @Args('loginUserInput') loginUserInput: LoginUserParams,
  ) {
    try {
      return this.userService.login(loginUserInput, i18n);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => UserResponse)
  me(@I18n() i18n: I18nContext, @Context() { req }: AppContext) {
    try {
      const { user } = req;
      return this.userService.getMe(user.id, i18n);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String)
  updateMePassword(
    @Args('updateMePasswordInput')
    updateMePasswordInput: UpdateMePasswordParams,
    @Context() { req }: AppContext,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const { user } = req;
      return this.userService.updateMePassword(
        user.id,
        updateMePasswordInput,
        i18n,
      );
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @Mutation(() => String)
  resetPassword(
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordParams,
    @I18n() i18n: I18nContext,
  ) {
    try {
      return this.userService.resetPassword(resetPasswordInput, i18n);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @CacheTTL(AppConfig.verificationCodeExpiryInSec)
  @Mutation(() => SendVerificationCodeResponse)
  resendVerificationCode(
    @Args('resendCodeInput') resendCodeInput: ResendCodeParams,
    @I18n() i18n: I18nContext,
  ) {
    try {
      return this.userService.resendVerificationCode(resendCodeInput, i18n);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @CacheTTL(AppConfig.verificationCodeExpiryInSec)
  @Mutation(() => VerifyForgotPasswordCodeResponse)
  verifyForgotPasswordCode(
    @Args('verifyForgotPasswordCodeInput')
    verifyForgotPasswordCodeInput: VerifyForgotPasswordCodeParams,
    @I18n() i18n: I18nContext,
  ) {
    try {
      return this.userService.verifyForgotPasswordCode(
        verifyForgotPasswordCodeInput,
        i18n,
      );
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @ResolveField(() => String, { nullable: true })
  token(
    @I18n() i18n: I18nContext,
    @Context() { req }: AppContext,
    @Parent() parent: UserEntity,
  ) {
    try {
      const { token } = this.userService.getToken(req, parent);
      return token;
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @ResolveField(() => String, { nullable: true })
  expiresIn(
    @I18n() i18n: I18nContext,
    @Context() { req }: AppContext,
    @Parent() parent: UserEntity,
  ) {
    try {
      const { expiresIn } = this.userService.getToken(req, parent);
      return expiresIn;
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @Subscription(() => String)
  addChat(@Context('pubsub') pubSub: PubSub) {
    return pubSub.asyncIterator('addChat');
  }

  @Query(() => String)
  async publishChat(@Context('pubsub') pubSub: PubSub) {
    await pubSub.publish('addChat', {
      addChat: 'chat was added',
    });
    return 'done';
  }
}
