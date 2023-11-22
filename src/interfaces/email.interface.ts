export interface INewSignupParams {
  username: string;
  subject: string;
  expiresAt: string;
  verificationLink: string;
}

export type ITemplateReturnType = INewSignupParams;

export interface IEmailTemplates {
  subject: string;
  getTemplates: Record<string, (args: ITemplateReturnType) => string>;
}
