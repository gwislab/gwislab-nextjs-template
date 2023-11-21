import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestArgs = context.getArgs()[0];

    if (requestArgs.url) {
      if (!requestArgs.url.includes('mp4')) {
        return next
          .handle()
          .pipe(
            catchError(() =>
              throwError(
                () =>
                  new BadRequestException('We cannot stream that type of file'),
              ),
            ),
          );
      }
    }

    return next
      .handle()
      .pipe(
        catchError((err) =>
          throwError(() =>
            err instanceof Error ? err : new BadRequestException(err),
          ),
        ),
      );
  }
}
