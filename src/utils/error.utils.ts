import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { AppLoggerUtils } from './logger.utils';

@Injectable()
export class AppErrorUtils {
  constructor(
    private readonly i18n: I18nService,
    private readonly logger: AppLoggerUtils,
  ) {}

  handler(
    error: any,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    this.logger.log(JSON.stringify({ error, statusCode }));

    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        throw new BadRequestException(error, this.i18n.t('errors.badRequest'));
      case HttpStatus.NOT_FOUND:
        throw new NotFoundException(error, this.i18n.t('errors.404'));
      case HttpStatus.FORBIDDEN:
        throw new ForbiddenException(error, this.i18n.t('errors.forbidden'));
      case HttpStatus.UNAUTHORIZED:
        throw new UnauthorizedException(
          error,
          this.i18n.t('errors.unauthorized'),
        );
      case HttpStatus.TOO_MANY_REQUESTS:
        throw new RequestTimeoutException(
          error,
          this.i18n.t('errors.tooManyRequest'),
        );

      default: {
        if (
          error instanceof ForbiddenException ||
          error instanceof UnauthorizedException ||
          error instanceof RequestTimeoutException ||
          error instanceof BadRequestException ||
          error instanceof NotFoundException
        ) {
          throw error;
        }
        throw new InternalServerErrorException(
          error,
          this.i18n.t('errors.somethingWentWrong'),
        );
      }
    }
  }
}
