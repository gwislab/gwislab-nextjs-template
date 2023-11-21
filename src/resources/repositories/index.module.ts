import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ServerDocumentRepository } from './server-document.repository';
import { AppErrorUtils, AppLoggerUtils } from 'utils';

@Module({
  providers: [
    UserRepository,
    ServerDocumentRepository,
    AppLoggerUtils,
    AppErrorUtils,
  ],
  exports: [UserRepository, ServerDocumentRepository],
})
export class RepositoryModule {}
