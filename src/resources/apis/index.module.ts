import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { RepositoryModule } from '../repositories/index.module';
import { UtilsModule } from 'utils/index.module';
import { ServiceModule } from 'resources/services/index.module';
import { VerifyEmailController } from './verify-email';

@Module({
  controllers: [DocumentsController, VerifyEmailController],
  imports: [RepositoryModule, UtilsModule, ServiceModule],
})
export class ApiModule {}
