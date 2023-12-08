import {
  Resolver,
  Mutation,
  Args,
  Query,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AppErrorUtils, AppLoggerUtils } from 'utils';
import {
  PaginateDoormotQuestionResponsesParams,
  SaveDoormotQuestionResponseParams,
  UpdateDoormotQuestionResponseParams,
} from 'resources/dtos';
import { IsAdmin } from 'guards';
import { AppContext } from 'interfaces';
import { I18n, I18nContext } from 'nestjs-i18n';
import {
  DoormotQuestionResponseEntity,
  ManyDoormotQuestionResponseResponse,
  SingleDoormotQuestionResponseResponse,
} from 'resources/entities/doormot-question-response.entity';
import { DoormotQuestionResponseService } from 'resources/services/dootmot-question-response.service';
import { DoormotQuestionEntity } from 'resources/entities';
import { DoormotQuestionRepository } from 'resources/repositories/doormot-questions.repository';
import { UserRepository } from 'resources/repositories';

@Resolver(() => DoormotQuestionResponseEntity)
export class DoormotQuestionResponseResolver {
  constructor(
    private readonly doormotQuestionService: DoormotQuestionResponseService,
    private readonly doormotQuestionRepository: DoormotQuestionRepository,
    private readonly userRepository: UserRepository,
    private readonly logger: AppLoggerUtils,
    private readonly error: AppErrorUtils,
  ) {
    this.logger.setContext(DoormotQuestionResponseResolver.name);
  }

  @UseGuards(IsAdmin)
  @Mutation(() => ManyDoormotQuestionResponseResponse)
  createManyDoormotQuestionResponses(
    @I18n() i18n: I18nContext,
    @Args('createManyDoormotQuestionResponsesInput', {
      type: () => [SaveDoormotQuestionResponseParams],
    })
    createManyDoormotQuestionResponsesInput: SaveDoormotQuestionResponseParams[],
    @Context() { req }: AppContext,
  ) {
    try {
      const { user } = req;
      return this.doormotQuestionService.createDoormotQuestionResponses(
        createManyDoormotQuestionResponsesInput,
        user,
        i18n,
      );
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @UseGuards(IsAdmin)
  @Mutation(() => SingleDoormotQuestionResponseResponse)
  updateDoormotQuestionResponse(
    @I18n() i18n: I18nContext,
    @Args('updateDoormotQuestionResponseInput', {
      type: () => UpdateDoormotQuestionResponseParams,
    })
    updateDoormotQuestionResponseInput: UpdateDoormotQuestionResponseParams,
    @Context() { req }: AppContext,
  ) {
    try {
      const { user } = req;
      return this.doormotQuestionService.updateDoormotQuestionResponse(
        updateDoormotQuestionResponseInput,
        user,
        i18n,
      );
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @UseGuards(IsAdmin)
  @Query(() => ManyDoormotQuestionResponseResponse)
  getManyDoormotQuestionResponses(
    @I18n() i18n: I18nContext,
    @Args('paginateDoormotQuestionResponsesInput')
    filter: PaginateDoormotQuestionResponsesParams,
  ) {
    try {
      return this.doormotQuestionService.getManyDoormotQuestionResponses(
        filter,
        i18n,
      );
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @UseGuards(IsAdmin)
  @Mutation(() => SingleDoormotQuestionResponseResponse)
  removeManyDoormotQuestionResponse(
    @I18n() i18n: I18nContext,
    @Context() { req }: AppContext,
    @Args('id', { type: () => String }) id: string,
  ) {
    try {
      const { user } = req;
      return this.doormotQuestionService.removeQuestion(id, user, i18n);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @ResolveField(() => DoormotQuestionEntity)
  doormotQuestion(@Parent() parent: DoormotQuestionResponseEntity) {
    try {
      return this.doormotQuestionRepository.getDoormotQuestionByFilter({
        id: parent.doormotQuestionId,
      });
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @ResolveField(() => DoormotQuestionEntity)
  user(@Parent() parent: DoormotQuestionResponseEntity) {
    try {
      return this.userRepository.getUserByFilter({
        id: parent.userId,
      });
    } catch (error) {
      throw this.error.handler(error);
    }
  }
}
