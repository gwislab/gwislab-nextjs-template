import { Module } from '@nestjs/common';
import { DocumentsService } from './documents/documents.service';
import { DocumentsController } from './documents/documents.controller';
import { RepositoryModule } from '../repositories/index.module';
import { UtilsModule } from 'utils/index.module';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService],
  imports: [RepositoryModule, UtilsModule],
})
export class ApiModule {}
