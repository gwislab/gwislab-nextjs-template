import { PipeTransform, Injectable, HttpStatus } from '@nestjs/common';
import { SignUpUserInput } from '../resources/dtos/user-auth.input';
import { AppErrorUtils } from '../utils/error.utils';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ValidateSignupArgs implements PipeTransform {
  constructor(
    private readonly i18n?: I18nService,
    private readonly error?: AppErrorUtils,
  ) {}

  transform(value: SignUpUserInput) {
    if (value.cpassword !== value.password) {
      throw this.error.handler(
        this.i18n.t('errors.passwordNotMatch'),
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!value.isTermsAgreed) {
      throw this.error.handler(
        this.i18n.t('errors.termsAndConditionRequired'),
        HttpStatus.BAD_REQUEST,
      );
    }

    delete value.cpassword;

    return value;
  }
}
