import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { RepositoryModule } from '../repositories/index.module';
import { UtilsModule } from '../../utils/index.module';
import { ServiceModule } from '../services/index.module';

@Module({
  providers: [UserResolver],
  imports: [RepositoryModule, UtilsModule, ServiceModule],
})
export class ResolverModule {}
