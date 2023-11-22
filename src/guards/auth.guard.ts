import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AppErrorUtils, AuthGuardUtils } from 'utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly error: AppErrorUtils,
    private readonly authGuardUtils: AuthGuardUtils,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      await this.authGuardUtils.shouldActivate(context);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw this.error.handler('sessionExpired', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
