import { IEmailTemplates } from 'interfaces';
import {
  newSignupTemplateEn,
  newSignupTemplateFr,
} from './templates/new-signup';
import {
  verificationCodeEn,
  verificationCodeFr,
} from './templates/verification-code';

type templateKeys = 'newSignup' | 'verificationCode';

export const emailTemplates: Record<templateKeys, IEmailTemplates> = {
  newSignup: {
    en: newSignupTemplateEn,
    fr: newSignupTemplateFr,
  },
  verificationCode: {
    en: verificationCodeEn,
    fr: verificationCodeFr,
  },
};
