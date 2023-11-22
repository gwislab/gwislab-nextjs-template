import { Module } from '@nestjs/common';
import { AppLoggerUtils } from './logger.utils';
import { AppErrorUtils } from './error.utils';
import { HelperUtils } from './helpers.utils';
import { UploadUtils } from './upload.utils';
import { AuthGuardUtils } from './auth-guard.utils';
import { EmailUtils } from './email.utils';

@Module({
  providers: [
    AppErrorUtils,
    AppLoggerUtils,
    HelperUtils,
    UploadUtils,
    AuthGuardUtils,
    EmailUtils,
  ],
  exports: [
    AppLoggerUtils,
    AppErrorUtils,
    HelperUtils,
    UploadUtils,
    AuthGuardUtils,
    EmailUtils,
  ],
})
export class UtilsModule {}
