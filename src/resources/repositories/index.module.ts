import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ServerDocumentRepository } from './server-document.repository';
import { DoormotQuestionRepository } from './doormot-questions.repository';
import { AppErrorUtils, AppLoggerUtils } from 'utils';

@Module({
  providers: [
    UserRepository,
    ServerDocumentRepository,
    DoormotQuestionRepository,
    AppLoggerUtils,
    AppErrorUtils,
  ],
  exports: [
    UserRepository,
    ServerDocumentRepository,
    DoormotQuestionRepository,
  ],
})
export class RepositoryModule {}
