import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ServerDocumentRepository } from './server-document.repository';
import { DoormotQuestionRepository } from './doormot-questions.repository';
import { AppErrorUtils, AppLoggerUtils } from 'utils';
import { DoormotQuestionResponseRepository } from './doormot-questions-response.repository';

@Module({
  providers: [
    UserRepository,
    ServerDocumentRepository,
    DoormotQuestionRepository,
    DoormotQuestionResponseRepository,
    AppLoggerUtils,
    AppErrorUtils,
  ],
  exports: [
    UserRepository,
    ServerDocumentRepository,
    DoormotQuestionRepository,
    DoormotQuestionResponseRepository,
  ],
})
export class RepositoryModule {}
