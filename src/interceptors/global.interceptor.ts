import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  constructor(private readonly i18n: I18nService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // map((data) => HelperUtils.removeNulls(data)),
      catchError((err) => {
        console.log({ err });

        let foundError: any[] = err.response.message;
        const property = err.response.property;
        const error = err.response.error;

        if (typeof foundError == 'object' && foundError?.length) {
          foundError = foundError.map((err) => {
            const message = this.i18n.t(`errors.${err.message}`);
            return {
              ...err,
              message: message.includes('errors') ? err.message : message,
            };
          });
        } else if (foundError?.length) {
          const message = this.i18n.t(`errors.${foundError}`);
          foundError = message.includes('errors')
            ? [{ message: foundError, property, error }]
            : [{ message, property, error }];
        }

        return throwError(() => new BadRequestException(foundError || err));
      }),
    );
  }
}
