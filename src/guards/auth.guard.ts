import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import config from '../config/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AppErrorUtils } from '../utils/error.utils';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
    private readonly error: AppErrorUtils,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw this.error.handler(
        this.i18n.t('errors.missingAuthHeader'),
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.jwtSecret,
      });

      if (!payload) {
        throw this.error.handler(
          this.i18n.t('errors.userAlreadyExit'),
          HttpStatus.UNAUTHORIZED,
        );
      }
      req.user = payload;
      req.token = token;
    } catch {
      throw this.error.handler(
        this.i18n.t('errors.sessionExpired'),
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
