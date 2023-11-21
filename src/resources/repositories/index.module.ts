import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UtilsModule } from 'src/utils/index.module';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
  imports: [UtilsModule],
})
export class RepositoryModule {}
