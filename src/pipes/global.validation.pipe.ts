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

@Injectable()
export class GlobalParamsValidator implements PipeTransform {
  transform(value: any, { metatype }: ArgumentMetadata) {
    value = HelperUtils.removeNulls(value);

    if (metatype.toString().includes('SignUpUserParams')) {
      return this.validateSignupInput(value);
    }

    return value;
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
}
