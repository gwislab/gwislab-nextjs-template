import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { HelperUtils } from 'utils';
import {
  PaginateDoormotQuestionsParams,
  SignUpUserParams,
} from 'resources/dtos';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class GlobalParamsValidator implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    try {
      if (!metatype || !this.toValidate(metatype)) {
        return value;
      }
      const object = plainToInstance(metatype, value);
      const errors = await validate(object);
      if (errors.length > 0) {
        throw new BadRequestException('Validation failed');
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

    if (value?.cpassword && value?.cpassword !== value?.password) {
      throw new BadRequestException(
        HelperUtils.structureError('password', 'passwordNotMatch'),
      );
    }

    if (
      typeof value?.isTermsAgreed === 'boolean' &&
      value?.isTermsAgreed == false
    ) {
      throw new BadRequestException(
        HelperUtils.structureError(
          'isTermsAgreed',
          'termsAndConditionRequired',
        ),
      );
    }

    if (
      (value?.page && value?.page && value?.page <= 0) ||
      (value?.limit && value?.limit <= 0)
    ) {
      throw new BadRequestException(
        HelperUtils.structureError('input', 'invalidPaginationValue'),
      );
    }
    delete value?.cpassword;

    return value;
  };

  private toValidate(metatype: any): boolean {
    // metatype.toString().includes('SignUpUserParams')
    const types: any[] = [String, Boolean, Number, Object, I18nContext];
    return !types.includes(metatype);
  }
}
