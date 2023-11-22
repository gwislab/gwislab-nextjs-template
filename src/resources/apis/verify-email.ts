import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { UserService } from 'resources/services';
import { AppErrorUtils, AppLoggerUtils } from 'utils';
import { Response } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Observable, of } from 'rxjs';

@Controller('verify-email')
export class VerifyEmailController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: AppLoggerUtils,
    private readonly error: AppErrorUtils,
  ) {
    this.logger.setContext(VerifyEmailController.name);
  }

  @Get(':token')
  async verifyUserEmail(
    @Param('token') token: string,
    @Res() res: Response,
    @I18n() i18n: I18nContext,
  ): Promise<Response<any, Record<string, any>> | Observable<any>> {
    try {
      const { status, ...responseData } = await this.userService.verifyEmail(
        token,
        i18n,
      );

      if (status !== HttpStatus.OK) {
        return res.status(status).send(responseData);
      }
      return of(res.sendFile(`${responseData.data}`), res.status(status));
    } catch (error) {
      this.error.handler(error);
    }
  }
}
