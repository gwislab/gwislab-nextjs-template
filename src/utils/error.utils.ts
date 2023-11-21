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

@Injectable()
export class AppErrorUtils {
  constructor(private readonly i18n: I18nService) {}

  handler(
    error: any,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        throw new BadRequestException(this.i18n.t('errors.badRequest'), error);
      case HttpStatus.NOT_FOUND:
        throw new NotFoundException(this.i18n.t('errors.404'), error);
      case HttpStatus.FORBIDDEN:
        throw new ForbiddenException(this.i18n.t('errors.forbidden'), error);
      case HttpStatus.UNAUTHORIZED:
        throw new UnauthorizedException(
          this.i18n.t('errors.unauthorized'),
          error,
        );
      case HttpStatus.TOO_MANY_REQUESTS:
        throw new RequestTimeoutException(
          this.i18n.t('errors.tooManyRequest'),
          error,
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
