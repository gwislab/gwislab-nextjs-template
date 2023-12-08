import { Injectable } from '@nestjs/common';

import {
  FilterDoormotQuestionsParams,
  PaginateDoormotQuestionsParams,
  SaveDoormotQuestionParams,
  UpdateDoormotQuestionParams,
} from 'resources/dtos';
import { AppErrorUtils, AppLoggerUtils } from 'utils';
import { prisma } from 'lib';
import { DoormotQuestion } from '@prisma/client';

@Injectable()
export class DoormotQuestionRepository {
  constructor(
    private readonly error: AppErrorUtils,
    private readonly logger: AppLoggerUtils,
  ) {
    this.logger.setContext(DoormotQuestionRepository.name);
  }

  saveDoormotQuestionDetails = async (
    data: SaveDoormotQuestionParams,
  ): Promise<DoormotQuestion> => {
    try {
      return await prisma.doormotQuestion.create({ data });
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  getDoormotQuestionByFilter = async (
    where: FilterDoormotQuestionsParams,
  ): Promise<DoormotQuestion> => {
    try {
      return await prisma.doormotQuestion.findFirst({ where });
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  getManyDoormotQuestionByFilter = async ({
    page,
    limit,
    ...where
  }: PaginateDoormotQuestionsParams) => {
    try {
      return await prisma.doormotQuestion.findMany({
        where,
        skip: typeof page == 'number' ? page * limit : undefined,
        take: typeof page == 'number' ? limit : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  updateDoormotQuestion = async ({
    id,
    ...data
  }: UpdateDoormotQuestionParams): Promise<DoormotQuestion> => {
    try {
      return await prisma.doormotQuestion.update({ data, where: { id } });
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  deleteDoormotQuestion = async (
    id: string,
    updatedBy: string,
  ): Promise<DoormotQuestion> => {
    try {
      return await prisma.doormotQuestion.update({
        where: { id },
        data: {
          updatedBy,
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw this.error.handler(error);
    }
  };
}
