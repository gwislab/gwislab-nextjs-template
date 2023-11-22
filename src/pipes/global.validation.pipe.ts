import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { HelperUtils } from 'utils';
import { SignUpUserInput } from 'resources/dtos';

@Injectable()
export class GlobalParamsValidator implements PipeTransform {
  transform(value: any, { metatype }: ArgumentMetadata) {
    value = HelperUtils.removeNulls(value);

    if (metatype.toString().includes('SignUpUserInput')) {
      return this.validateSignupInput(value);
    }

    return value;
  }

  validateSignupInput = (value: SignUpUserInput) => {
    if (value.cpassword !== value.password) {
      throw new BadRequestException(
        HelperUtils.structureError('password', 'passwordNotMatch'),
      );
    }

    if (value.isTermsAgreed == false) {
      throw new BadRequestException(
        HelperUtils.structureError(
          'isTermsAgreed',
          'termsAndConditionRequired',
        ),
      );
    }

    delete value.cpassword;

    return value;
  };
}
