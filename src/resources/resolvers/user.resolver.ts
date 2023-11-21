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
import { UseGuards, UsePipes } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { PubSub } from 'graphql-subscriptions';
import { UserEntity } from 'resources/entities';
import { UserService } from 'resources/services';
import { AppErrorUtils, AppLoggerUtils } from 'utils';
import { ValidateSignupArgs } from 'pipes';
import { LoginUserInput, SignUpUserInput } from 'resources/dtos';
import { AuthGuard } from 'guards';
import { AppContext } from 'interfaces';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly logger: AppLoggerUtils,
    private readonly error: AppErrorUtils,
  ) {}

  @UsePipes(new ValidateSignupArgs())
  @Mutation(() => UserEntity)
  signupUser(
    @Args('signupUserInput') signupUserInput: SignUpUserInput,
    @I18n() i18n: I18nContext,
  ) {
    try {
      return this.userService.signup(signupUserInput, i18n);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @Mutation(() => UserEntity)
  loginUser(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @I18n() i18n: I18nContext,
  ) {
    try {
      return this.userService.login(loginUserInput, i18n);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => UserEntity)
  me(@Context() { req }: AppContext, @I18n() i18n: I18nContext) {
    try {
      const { user } = req;
      return this.userService.getMe(user.id, i18n);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @ResolveField(() => String, { nullable: true })
  token(@Context() { req }: AppContext, @Parent() parent) {
    try {
      const { token } = this.userService.getToken(req, parent);
      return token;
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @ResolveField(() => String, { nullable: true })
  expiresIn(@Context() { req }: AppContext, @Parent() parent) {
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
