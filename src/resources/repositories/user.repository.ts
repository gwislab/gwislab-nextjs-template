import { Injectable } from '@nestjs/common';
import { AppLoggerUtils } from '../../utils/logger.utils';
import { User } from '@prisma/client';
import prisma from '../../lib/prisma';
import { AppErrorUtils } from 'src/utils/error.utils';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    private readonly logger: AppLoggerUtils,
    private readonly error: AppErrorUtils,
  ) {
    this.logger.setContext(UserRepository.name);
  }

  saveUserDetails = async (data: UserEntity): Promise<User> => {
    try {
      return await prisma.user.create({ data });
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  getUserByFilter = async (where: Partial<UserEntity>): Promise<User> => {
    try {
      return await prisma.user.findFirst({ where });
    } catch (error) {
      throw this.error.handler(error);
    }
  };
}
