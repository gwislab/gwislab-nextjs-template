import { HttpStatus, Injectable } from '@nestjs/common';
import { AppLoggerUtils } from '../../utils/logger.utils';
import { UserEntity } from '../entities/user.entity';
import { AppErrorUtils } from '../../utils/error.utils';
import { I18nContext } from 'nestjs-i18n';

import {
  PaginateDoormotQuestionResponsesParams,
  SaveDoormotQuestionResponseParams,
  UpdateDoormotQuestionResponseParams,
} from 'resources/dtos';
import { DoormotQuestionResponseRepository } from 'resources/repositories/doormot-questions-response.repository';
import {
  DoormotQuestionResponseEntity,
  ManyDoormotQuestionResponseResponse,
  SingleDoormotQuestionResponseResponse,
} from 'resources/entities/doormot-question-response.entity';
import { UserRepository } from 'resources/repositories';

@Injectable()
export class DoormotQuestionResponseService {
  constructor(
    private readonly logger: AppLoggerUtils,
    private readonly error: AppErrorUtils,
    private readonly doormotQuestionRepo: DoormotQuestionResponseRepository,
    private readonly userRepo: UserRepository,
  ) {
    this.logger.setContext(DoormotQuestionResponseService.name);
  }

  createDoormotQuestionResponses = async (
    data: SaveDoormotQuestionResponseParams[],
    user: UserEntity,
    i18n: I18nContext,
  ): Promise<ManyDoormotQuestionResponseResponse> => {
    try {
      const createdUserResponse: DoormotQuestionResponseEntity[] = [];

      for (const question of data) {
        const createdQuestion =
          await this.doormotQuestionRepo.saveDoormotQuestionResponseDetails({
            ...question,
            userId: user.id,
            createdBy: user.id,
          });

        createdUserResponse.push(createdQuestion);
      }

      // await this.userRepo.updateUserDetails({
      //   id: user.id,
      //   data: { isAccountSetup: true },
      // });

      return {
        message: i18n.t('success.thankYouResponse'),
        payload: createdUserResponse,
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  getManyDoormotQuestionResponses = async (
    filter: PaginateDoormotQuestionResponsesParams,
    i18n: I18nContext,
  ): Promise<ManyDoormotQuestionResponseResponse> => {
    try {
      return {
        message: i18n.t('success.success'),
        payload:
          await this.doormotQuestionRepo.getManyDoormotQuestionResponseByFilter(
            filter,
          ),
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  updateDoormotQuestionResponse = async (
    { id, data }: UpdateDoormotQuestionResponseParams,
    user: UserEntity,
    i18n: I18nContext,
  ): Promise<SingleDoormotQuestionResponseResponse> => {
    try {
      const foundQuestion =
        await this.doormotQuestionRepo.getDoormotQuestionResponseByFilter({
          id,
        });

      if (!foundQuestion) {
        throw this.error.handler(
          i18n.t('errors.questionDoesNotExist'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedQuestion =
        await this.doormotQuestionRepo.updateDoormotQuestionResponse({
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
  ): Promise<SingleDoormotQuestionResponseResponse> => {
    try {
      const foundQuestion =
        await this.doormotQuestionRepo.getDoormotQuestionResponseByFilter({
          id,
        });

      if (!foundQuestion) {
        throw this.error.handler(
          i18n.t('errors.questionDoesNotExist'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const deletedQuestion =
        await this.doormotQuestionRepo.deleteDoormotQuestionResponse(
          id,
          user.id,
        );

      return {
        message: i18n.t('success.success'),
        payload: deletedQuestion,
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };
}
