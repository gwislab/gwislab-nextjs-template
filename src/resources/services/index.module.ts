import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UtilsModule } from 'utils/index.module';
import { RepositoryModule } from 'resources/repositories/index.module';
import { DocumentsService } from './documents.service';

@Module({
  providers: [UserService, DocumentsService],
  exports: [UserService, DocumentsService],
  imports: [UtilsModule, RepositoryModule],
})
export class ServiceModule {}
