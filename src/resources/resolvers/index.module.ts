import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UtilsModule } from 'utils/index.module';
import { RepositoryModule } from 'resources/repositories/index.module';
import { ServiceModule } from 'resources/services/index.module';

@Module({
  providers: [UserResolver],
  imports: [RepositoryModule, UtilsModule, ServiceModule],
})
export class ResolverModule {}
