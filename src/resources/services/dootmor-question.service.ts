import { HttpStatus, Injectable } from '@nestjs/common';
import { AppLoggerUtils } from '../../utils/logger.utils';
import { UserEntity } from '../entities/user.entity';
import { AppErrorUtils } from '../../utils/error.utils';
import { I18nContext } from 'nestjs-i18n';
import {
  DoormotQuestionEntity,
  ManyDoormotQuestionResponse,
  SingleDoormotQuestionResponse,
} from 'resources/entities';
import {
  PaginateDoormotQuestionsParams,
  SaveDoormotQuestionParams,
  UpdateDoormotQuestionParams,
} from 'resources/dtos';
import { DoormotQuestionRepository } from 'resources/repositories/doormot-questions.repository';

@Injectable()
export class DoormotQuestionService {
  constructor(
    private readonly logger: AppLoggerUtils,
    private readonly error: AppErrorUtils,
    private readonly doormotQuestionRepo: DoormotQuestionRepository,
  ) {
    this.logger.setContext(DoormotQuestionService.name);
  }

  createDoormotQuestions = async (
    data: SaveDoormotQuestionParams[],
    user: UserEntity,
    i18n: I18nContext,
  ): Promise<ManyDoormotQuestionResponse> => {
    try {
      const createdQuestions: DoormotQuestionEntity[] = [];

      for (const question of data) {
        const foundQuestion =
          await this.doormotQuestionRepo.getDoormotQuestionByFilter({
            textEn: question.textEn,
            textFr: question.textFr,
          });

        if (foundQuestion) {
          continue;
        }

        const createdQuestion =
          await this.doormotQuestionRepo.saveDoormotQuestionDetails({
            ...question,
            createdBy: user.id,
          });

        createdQuestions.push(createdQuestion);
      }

      return {
        message: i18n.t('success.success'),
        payload: createdQuestions,
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  getManyDoormotQuestions = async (
    filter: PaginateDoormotQuestionsParams,
    i18n: I18nContext,
  ): Promise<ManyDoormotQuestionResponse> => {
    try {
      return {
        message: i18n.t('success.success'),
        payload:
          await this.doormotQuestionRepo.getManyDoormotQuestionByFilter(filter),
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  updateDoormotQuestion = async (
    { id, data }: UpdateDoormotQuestionParams,
    user: UserEntity,
    i18n: I18nContext,
  ): Promise<SingleDoormotQuestionResponse> => {
    try {
      const foundQuestion =
        await this.doormotQuestionRepo.getDoormotQuestionByFilter({
          id,
        });

      if (!foundQuestion) {
        throw this.error.handler(
          i18n.t('errors.questionDoesNotExist'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedQuestion =
        await this.doormotQuestionRepo.updateDoormotQuestion({
          id,
          data: {
            ...data,
            updatedBy: user.id,
          },
        });

      return {
        message: i18n.t('success.success'),
        payload: updatedQuestion,
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  removeQuestion = async (
    id: string,
    user: UserEntity,
    i18n: I18nContext,
  ): Promise<SingleDoormotQuestionResponse> => {
    try {
      const foundQuestion =
        await this.doormotQuestionRepo.getDoormotQuestionByFilter({
          id,
        });

      if (!foundQuestion) {
        throw this.error.handler(
          i18n.t('errors.questionDoesNotExist'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const deletedQuestion =
        await this.doormotQuestionRepo.deleteDoormotQuestion(id, user.id);

      return {
        message: i18n.t('success.success'),
        payload: deletedQuestion,
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };
}
