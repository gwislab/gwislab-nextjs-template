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
import { SignupUserResponse, UserEntity } from 'resources/entities';
import { UserService } from 'resources/services';
import { AppErrorUtils, AppLoggerUtils } from 'utils';
import { LoginUserInput, SignUpUserInput } from 'resources/dtos';
import { AuthGuard } from 'guards';
import { AppContext } from 'interfaces';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly logger: AppLoggerUtils,
    private readonly error: AppErrorUtils,
  ) {
    this.logger.setContext(UserResolver.name);
  }

  @Mutation(() => SignupUserResponse)
  signupUser(@Args('signupUserInput') signupUserInput: SignUpUserInput) {
    try {
      return this.userService.signup(signupUserInput);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @Mutation(() => SignupUserResponse)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    try {
      return this.userService.login(loginUserInput);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => SignupUserResponse)
  me(@Context() { req }: AppContext) {
    try {
      const { user } = req;
      return this.userService.getMe(user.id);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @ResolveField(() => String, { nullable: true })
  token(@Context() { req }: AppContext, @Parent() parent: UserEntity) {
    try {
      console.log({ parent });

      const { token } = this.userService.getToken(req, parent);
      return token;
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @ResolveField(() => String, { nullable: true })
  expiresIn(@Context() { req }: AppContext, @Parent() parent: UserEntity) {
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
