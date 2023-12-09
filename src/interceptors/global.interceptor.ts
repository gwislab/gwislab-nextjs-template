import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppErrorUtils } from 'utils';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  constructor(
    private readonly i18n: I18nService,
    private readonly error: AppErrorUtils,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // map((data) => HelperUtils.removeNulls(data)),
      catchError((err) => {
        console.log({ err });

        let message: any[] = err.response.message;
        const property = err.response.property;
        const error = err.response.error;
        let foundError;

        console.log({ message, property, error, err });

        if (typeof message == 'object' && message?.length) {
          foundError = message.map((err) => {
            const message = this.i18n.t(`errors.${err.message}`);
            return {
              ...err,
              message: message.includes('errors') ? err.message : message,
            };
          });
        } else if (property && message?.length) {
          message = this.i18n.t(`errors.${message}`);
          foundError = message.includes('errors')
            ? [{ message, property, error }]
            : [{ message, property, error }];
        }

        return throwError(() => this.error.handler(foundError || err));
      }),
    );
  }
}
