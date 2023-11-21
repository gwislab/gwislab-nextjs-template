import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UtilsModule } from 'utils/index.module';
import { RepositoryModule } from 'resources/repositories/index.module';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [UtilsModule, RepositoryModule],
})
export class ServiceModule {}
