import { Module } from '@nestjs/common';
import { AppLoggerUtils } from './logger.utils';
import { AppErrorUtils } from './error.utils';
import { HelperUtils } from './helpers.utils';
import { UploadUtils } from './upload.utils';
import { AuthGuardUtils } from './auth-guard.utils';
// import { UserRepository } from 'resources/repositories';

@Module({
  providers: [
    AppErrorUtils,
    AppLoggerUtils,
    HelperUtils,
    UploadUtils,
    AuthGuardUtils,
    // UserRepository,
  ],
  exports: [
    AppLoggerUtils,
    AppErrorUtils,
    HelperUtils,
    UploadUtils,
    AuthGuardUtils,
  ],
  // imports: [RepositoryModule],
})
export class UtilsModule {}
