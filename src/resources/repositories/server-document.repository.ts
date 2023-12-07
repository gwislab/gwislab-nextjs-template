import { Injectable } from '@nestjs/common';

import { ServerDocument } from '@prisma/client';
import {
  FilterServerDocumentParams,
  SaveServerDocumentParams,
} from 'resources/dtos';
import { AppErrorUtils, AppLoggerUtils } from 'utils';
import { prisma } from 'lib';

@Injectable()
export class ServerDocumentRepository {
  constructor(
    private readonly error: AppErrorUtils,
    private readonly logger: AppLoggerUtils,
  ) {
    this.logger.setContext(ServerDocumentRepository.name);
  }

  saveServerDocumentDetails = async (
    data: SaveServerDocumentParams,
  ): Promise<ServerDocument> => {
    try {
      return await prisma.serverDocument.create({ data });
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  findServerDocumentByFilter = async (
    where: FilterServerDocumentParams,
  ): Promise<ServerDocument> => {
    try {
      return await prisma.serverDocument.findFirst({ where });
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  deleteServerDocument = async (id: string): Promise<ServerDocument> => {
    try {
      return await prisma.serverDocument.delete({ where: { id } });
    } catch (error) {
      throw this.error.handler(error);
    }
  };
}
