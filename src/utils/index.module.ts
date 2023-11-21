import { Module } from '@nestjs/common';
import { AppLoggerUtils } from './logger.utils';
import { AppErrorUtils } from './error.utils';
import { HelperUtils } from './helpers.utils';

@Module({
  providers: [AppErrorUtils, AppLoggerUtils, HelperUtils],
  exports: [AppLoggerUtils, AppErrorUtils, HelperUtils],
  imports: [],
})
export class UtilsModule {}
