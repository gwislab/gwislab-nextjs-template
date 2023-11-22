import { IEmailTemplates } from 'interfaces';
import {
  newSignupTemplateEn,
  newSignupTemplateFr,
} from './templates/new-signup';

type templateKeys = 'newSignup';

export const emailTemplates: Record<templateKeys, IEmailTemplates> = {
  newSignup: {
    subject: 'Verify your email',
    getTemplates: {
      en: newSignupTemplateEn,
      fr: newSignupTemplateFr,
    },
  },
};
