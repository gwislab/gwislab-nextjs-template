import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { EUserRole } from '@prisma/client';
import { AppErrorUtils, AuthGuardUtils } from 'utils';

@Injectable()
export class IsAdmin implements CanActivate {
  constructor(
    private readonly i18n: I18nService,
    private readonly error: AppErrorUtils,
    private readonly authGuardUtils: AuthGuardUtils,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      await this.authGuardUtils.shouldActivate(context, [EUserRole.ADMIN]);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw this.error.handler(
        this.i18n.t('errors.sessionExpired'),
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }
}
