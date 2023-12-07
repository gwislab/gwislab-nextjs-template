import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UtilsModule } from 'utils/index.module';
import { RepositoryModule } from 'resources/repositories/index.module';
import { DocumentsService } from './documents.service';
import { ServerDocumentRepository } from 'resources/repositories';
import { DoormotQuestionService } from './dootmor-question.service';

@Module({
  providers: [
    UserService,
    DocumentsService,
    ServerDocumentRepository,
    DoormotQuestionService,
  ],
  exports: [
    UserService,
    DocumentsService,
    ServerDocumentRepository,
    DoormotQuestionService,
  ],
  imports: [UtilsModule, RepositoryModule],
})
export class ServiceModule {}
