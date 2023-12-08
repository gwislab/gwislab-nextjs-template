import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { I18nService } from 'nestjs-i18n';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AppErrorUtils } from './error.utils';
import { ELocale, EUserRole } from '@prisma/client';
import { AppContext } from 'interfaces';
import { prisma } from 'lib';

@Injectable()
export class AuthGuardUtils {
  constructor(
    private readonly i18n: I18nService,
    private readonly error: AppErrorUtils,
    private readonly jwt: JwtService,
  ) {}

  async shouldActivate(
    context: ExecutionContext,
    role?: EUserRole[],
  ): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req }: AppContext = ctx.getContext();
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw this.error.handler(
        this.i18n.t('errors.missingAuthHeader'),
        HttpStatus.BAD_GATEWAY,
      );
    }

    try {
      const payload = await this.jwt.verify(token);

      if (!payload) {
        throw this.error.handler(
          this.i18n.t('errors.invalidToken'),
          HttpStatus.UNAUTHORIZED,
        );
      }
      let foundUser = await prisma.user.findFirst({
        where: {
          id: payload.userId,
        },
      });

      if (!foundUser) {
        throw this.error.handler(
          this.i18n.t('errors.notAuthorized'),
          HttpStatus.UNAUTHORIZED,
        );
      }

      const foundLocale = req.headers['doormot-user-locale'] as string;

      if (foundLocale && foundUser.locale.toLowerCase() !== foundLocale) {
        // change user locale settings
        foundUser = await prisma.user.update({
          where: {
            id: payload.userId,
          },
          data: {
            locale: foundLocale.toUpperCase() as ELocale,
          },
        });
      }

      req.user = foundUser;

      if (role) {
        if (!role?.includes(foundUser.userRole as EUserRole)) {
          throw this.error.handler(
            this.i18n.t('errors.notAuthorized'),
            HttpStatus.UNAUTHORIZED,
          );
        }
      }
      req.token = token;
    } catch (error) {
      console.log({ error });
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

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
