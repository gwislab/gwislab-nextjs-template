import { Injectable } from '@nestjs/common';
import { AppLoggerUtils } from '../../utils/logger.utils';
import { User } from '@prisma/client';
import { AppErrorUtils } from 'utils';
import { prisma } from 'lib';
import { GetUserParams, SaveUserDetailsParams } from 'resources/dtos';

@Injectable()
export class UserRepository {
  constructor(
    private readonly logger: AppLoggerUtils,
    private readonly error: AppErrorUtils,
  ) {
    this.logger.setContext(UserRepository.name);
  }

  saveUserDetails = async (data: SaveUserDetailsParams): Promise<User> => {
    try {
      return await prisma.user.create({ data });
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  getUserByFilter = async (where: GetUserParams): Promise<User> => {
    try {
      return await prisma.user.findFirst({ where });
    } catch (error) {
      throw this.error.handler(error);
    }
  };
}
