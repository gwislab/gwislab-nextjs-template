export interface INewSignupParams {
  username: string;
  subject: string;
  expiresAt: string;
  verificationLink: string;
}

export interface IVerificationCodeParams {
  username: string;
  subject: string;
  expiresAt: string;
  code: string;
}

export type ITemplateReturnType = INewSignupParams | IVerificationCodeParams;

export type IEmailTemplates = Record<
  string,
  (args: ITemplateReturnType) => string
>;
