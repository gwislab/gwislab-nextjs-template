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

      value = HelperUtils.removeNulls(value);

      console.log({ value });

      if (metatype.toString().includes('SignUpUserParams')) {
        return this.validateSignupInput(value);
      }

      return value;
    } catch (error) {
      console.log({ error });
    }
  }

  validateSignupInput = (
    value: SignUpUserParams & PaginateDoormotQuestionsParams,
  ) => {
    if (value.cpassword && value.cpassword !== value.password) {
      throw new BadRequestException(
        HelperUtils.structureError('password', 'passwordNotMatch'),
      );
    }

    if (
      typeof value.isTermsAgreed == 'boolean' &&
      value.isTermsAgreed == false
    ) {
      throw new BadRequestException(
        HelperUtils.structureError(
          'isTermsAgreed',
          'termsAndConditionRequired',
        ),
      );
    }

    if (
      (value.page && value.page && value.page <= 0) ||
      (value.limit && value.limit < 0)
    ) {
      throw new BadRequestException('invalidPaginationValue');
    }

    delete value.cpassword;

    return value;
  };

  private toValidate(metatype: any): boolean {
    console.log({ metatype }, metatype.toString());

    const types: any[] = [String, Boolean, Number, Object, I18nContext];
    return !types.includes(metatype);
  }
}
