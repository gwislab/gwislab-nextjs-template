import { Injectable } from '@nestjs/common';

import {
  FilterDoormotQuestionResponsesParams,
  PaginateDoormotQuestionResponsesParams,
  SaveDoormotQuestionResponseParams,
  UpdateDoormotQuestionResponseParams,
} from 'resources/dtos';
import { AppErrorUtils, AppLoggerUtils } from 'utils';
import { prisma } from 'lib';
import { DoormotQuestionUserResponse } from '@prisma/client';

@Injectable()
export class DoormotQuestionResponseRepository {
  constructor(
    private readonly error: AppErrorUtils,
    private readonly logger: AppLoggerUtils,
  ) {
    this.logger.setContext(DoormotQuestionResponseRepository.name);
  }

  saveDoormotQuestionResponseDetails = async (
    data: SaveDoormotQuestionResponseParams,
  ): Promise<DoormotQuestionUserResponse> => {
    try {
      return await prisma.doormotQuestionUserResponse.create({ data });
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  getDoormotQuestionResponseByFilter = async (
    where: FilterDoormotQuestionResponsesParams,
  ): Promise<DoormotQuestionUserResponse> => {
    try {
      return await prisma.doormotQuestionUserResponse.findFirst({ where });
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  getManyDoormotQuestionResponseByFilter = async ({
    page = 1,
    limit = 15,
    ...where
  }: PaginateDoormotQuestionResponsesParams) => {
    try {
      return await prisma.doormotQuestionUserResponse.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  updateDoormotQuestionResponse = async ({
    id,
    data,
  }: UpdateDoormotQuestionResponseParams): Promise<DoormotQuestionUserResponse> => {
    try {
      return await prisma.doormotQuestionUserResponse.update({
        data: { ...data },
        where: { id },
      });
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  deleteDoormotQuestionResponse = async (
    id: string,
    updatedBy: string,
  ): Promise<DoormotQuestionUserResponse> => {
    try {
      return await prisma.doormotQuestionUserResponse.update({
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
