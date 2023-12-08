import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UtilsModule } from 'utils/index.module';
import { RepositoryModule } from 'resources/repositories/index.module';
import { DocumentsService } from './documents.service';
import { ServerDocumentRepository } from 'resources/repositories';
import { DoormotQuestionService } from './dootmot-question.service';
import { DoormotQuestionResponseService } from './dootmot-question-response.service';

@Module({
  providers: [
    UserService,
    DocumentsService,
    ServerDocumentRepository,
    DoormotQuestionService,
    DoormotQuestionResponseService,
  ],
  exports: [
    UserService,
    DocumentsService,
    ServerDocumentRepository,
    DoormotQuestionService,
    DoormotQuestionResponseService,
  ],
  imports: [UtilsModule, RepositoryModule],
})
export class ServiceModule {}
