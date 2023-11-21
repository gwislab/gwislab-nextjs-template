import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerUtils extends ConsoleLogger {
  customLog() {
    this.log('Debug log!');
  }
}
