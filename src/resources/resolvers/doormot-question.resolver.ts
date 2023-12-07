import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import {
  ManyDoormotQuestionResponse,
  DoormotQuestionEntity,
  SingleDoormotQuestionResponse,
} from 'resources/entities';
import { AppErrorUtils, AppLoggerUtils } from 'utils';
import {
  PaginateDoormotQuestionsParams,
  SaveDoormotQuestionParams,
  UpdateDoormotQuestionParams,
} from 'resources/dtos';
import { AuthGuard, IsAdmin } from 'guards';
import { AppContext } from 'interfaces';
import { I18n, I18nContext } from 'nestjs-i18n';
import { DoormotQuestionService } from 'resources/services/dootmor-question.service';

@Resolver(() => DoormotQuestionEntity)
export class DoormotQuestionResolver {
  constructor(
    private readonly doormotQuestionService: DoormotQuestionService,
    private readonly logger: AppLoggerUtils,
    private readonly error: AppErrorUtils,
  ) {
    this.logger.setContext(DoormotQuestionResolver.name);
  }

  @UseGuards(IsAdmin)
  @Mutation(() => ManyDoormotQuestionResponse)
  createManyDoormotQuestions(
    @I18n() i18n: I18nContext,
    @Args('createManyDoormotQuestionsInput', {
      type: () => [SaveDoormotQuestionParams],
    })
    createManyDoormotQuestionsInput: SaveDoormotQuestionParams[],
    @Context() { req }: AppContext,
  ) {
    try {
      const { user } = req;
      return this.doormotQuestionService.createDoormotQuestions(
        createManyDoormotQuestionsInput,
        user,
        i18n,
      );
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @UseGuards(IsAdmin)
  @Mutation(() => SingleDoormotQuestionResponse)
  updateDoormotQuestion(
    @I18n() i18n: I18nContext,
    @Args('updateDoormotQuestionInput', {
      type: () => UpdateDoormotQuestionParams,
    })
    updateDoormotQuestionInput: UpdateDoormotQuestionParams,
    @Context() { req }: AppContext,
  ) {
    try {
      const { user } = req;
      return this.doormotQuestionService.updateDoormotQuestion(
        updateDoormotQuestionInput,
        user,
        i18n,
      );
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => ManyDoormotQuestionResponse)
  findManyDoormotQuestions(
    @I18n() i18n: I18nContext,
    @Args('paginateDoormotQuestionsInput')
    filter: PaginateDoormotQuestionsParams,
  ) {
    try {
      return this.doormotQuestionService.findManyDoormotQuestions(filter, i18n);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @UseGuards(IsAdmin)
  @Mutation(() => SingleDoormotQuestionResponse)
  removeManyDoormotQuestion(
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
}
