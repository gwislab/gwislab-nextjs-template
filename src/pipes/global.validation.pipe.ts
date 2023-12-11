import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';
import { AppErrorUtils, HelperUtils } from 'utils';
import {
  PaginateDoormotQuestionsParams,
  SignUpUserParams,
} from 'resources/dtos';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class GlobalParamsValidator implements PipeTransform {
  constructor(
    private readonly i18n: I18nService,
    private readonly error: AppErrorUtils,
  ) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    try {
      if (!metatype || !this.toValidate(metatype)) {
        return value;
      }

      const object = plainToInstance(metatype, value);
      const errors = await validate(object);

      if (errors.length > 0) {
        const constraints = errors.map((error: any) => error?.constraints);
        const foundErrorKey = Object.keys(constraints?.[0] || {})[0];

        throw this.error.handler(
          this.i18n.t(`errors.${constraints[0][foundErrorKey]}`),
          HttpStatus.BAD_REQUEST,
        );
      }

      value = this.validateAppInputs(value);

      return HelperUtils.removeNulls(value);
    } catch (error) {
      throw error;
    }
  }

  validateAppInputs = (
    value: SignUpUserParams & PaginateDoormotQuestionsParams,
  ) => {
    if (value?.id) {
      return value;
    }

    if (value?.confirmPassword && value?.confirmPassword !== value?.password) {
      throw this.error.handler(
        HelperUtils.structureError('password', 'passwordNotMatch'),
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      typeof value?.isTermsAgreed === 'boolean' &&
      value?.isTermsAgreed == false
    ) {
      throw this.error.handler(
        HelperUtils.structureError(
          'isTermsAgreed',
          'termsAndConditionRequired',
        ),
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      (value?.page && value?.page && value?.page <= 0) ||
      (value?.limit && value?.limit <= 0)
    ) {
      throw this.error.handler(
        HelperUtils.structureError('input', 'invalidPaginationValue'),
        HttpStatus.BAD_REQUEST,
      );
    }
    delete value?.confirmPassword;

    return value;
  };

  private toValidate(metatype: any): boolean {
    // metatype.toString().includes('SignUpUserParams')
    const types: any[] = [String, Boolean, Number, Object, I18nContext];
    return !types.includes(metatype);
  }
}
