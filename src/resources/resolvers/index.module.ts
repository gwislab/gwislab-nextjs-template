import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UtilsModule } from 'utils/index.module';
import { RepositoryModule } from 'resources/repositories/index.module';
import { ServiceModule } from 'resources/services/index.module';
import { DoormotQuestionResolver } from './doormot-question.resolver';

@Module({
  providers: [UserResolver, DoormotQuestionResolver],
  imports: [RepositoryModule, UtilsModule, ServiceModule],
})
export class ResolverModule {}
