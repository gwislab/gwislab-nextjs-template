import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AppLoggerUtils } from '../../utils/logger.utils';
import {
  SignUpUserParams,
  LoginUserParams,
  VerifyForgotPasswordCodeParams,
} from '../dtos/user-auth.input';
import {
  UserResponse,
  UserEntity,
  SendVerificationCodeResponse,
  VerifyForgotPasswordCodeResponse,
} from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories/user.repository';
import { AppErrorUtils } from '../../utils/error.utils';
import * as moment from 'moment';
import { HelperUtils } from 'utils';
import { IGetJwtPayload, IJwtPayload, IRequest } from 'interfaces';
import { emailTemplates } from 'assets/emails';
import { I18nContext } from 'nestjs-i18n';
import { EmailUtils } from 'utils/email.utils';
import { cwd } from 'process';
import { AppConfig, ErrorCode } from 'config';
import {
  ResendCodeParams,
  ResetPasswordParams,
  UpdateMePasswordParams,
  UpdateUserDetailsParams,
} from 'resources/dtos';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

@Injectable()
export class UserService {
  constructor(
    private readonly logger: AppLoggerUtils,
    private readonly error: AppErrorUtils,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly utils: HelperUtils,
    private readonly emailUtils: EmailUtils,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.logger.setContext(UserService.name);
  }

  signup = async (
    data: SignUpUserParams,
    i18n: I18nContext,
  ): Promise<UserResponse> => {
    try {
      const userExist = await this.userRepository.getUserByFilter({
        email: data.email,
      });

      if (userExist) {
        throw this.error.handler(
          i18n.t('errors.userAlreadyExit'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.userRepository.saveUserDetails({
        ...data,
        password: await this.utils.hashText(data.password),
      } as any);

      const payload = { userId: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload);

      const subject = i18n.t('email.newSignupSubject');

      const { verificationLink, expiresAt } =
        await this.utils.generateEmailLink(user);

      const html = emailTemplates.newSignup[i18n.lang]({
        subject,
        username: data.email,
        verificationLink,
        expiresAt,
      });

      await this.emailUtils.sendEmail({ to: data.email, subject, html });

      return {
        message: i18n.t('success.signupEmailSent'),
        payload: {
          ...user,
          token,
        },
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  update = async (
    data: UpdateUserDetailsParams,
    user: UserEntity,
    i18n: I18nContext,
  ): Promise<UserResponse> => {
    try {
      return {
        message: i18n.t('success.updated'),
        payload: await this.userRepository.updateUserDetails(user.id, data),
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  resendVerificationLink = async (
    user: UserEntity,
    i18n: I18nContext,
  ): Promise<UserResponse> => {
    try {
      const userExist = await this.userRepository.getUserByFilter({
        email: user.email,
      });

      if (!userExist) {
        throw this.error.handler(
          i18n.t('errors.userNotFound'),
          HttpStatus.BAD_REQUEST,
        );
      }
      const subject = i18n.t('email.newSignupSubject');

      const { verificationLink, expiresAt } =
        await this.utils.generateEmailLink(user);

      const html = emailTemplates.newSignup[i18n.lang]({
        subject,
        username: this.utils.getUserName(user),
        verificationLink,
        expiresAt,
      });

      await this.emailUtils.sendEmail({ to: user.email, subject, html });

      return {
        message: i18n.t('success.verificationLinkResent'),
        payload: {
          ...user,
        },
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  login = async (
    data: LoginUserParams,
    i18n: I18nContext,
  ): Promise<UserResponse> => {
    try {
      const user = await this.userRepository.getUserByFilter({
        email: data.email,
      });

      if (!user) {
        throw this.error.handler(
          i18n.t('errors.invalidPassword'),
          HttpStatus.NOT_FOUND,
        );
      }

      if (
        !(await this.utils.isHashMatch({
          password: data.password,
          hash: user.password,
        }))
      ) {
        throw this.error.handler(
          i18n.t('errors.invalidPassword'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const payload = { userId: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload);

      return {
        message: i18n.t('success.success'),
        payload: {
          ...user,
          token,
        },
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  getMe = async (userId: string, i18n: I18nContext): Promise<UserResponse> => {
    try {
      const user = await this.userRepository.getUserByFilter({
        id: userId,
      });

      if (!user) {
        throw this.error.handler(
          i18n.t('errors.userNotFound'),
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: i18n.t('success.success'),
        payload: user,
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  getToken = (req: IRequest, user: UserEntity): IGetJwtPayload => {
    try {
      const token = req?.token || user?.token;

      if (!token) return { expiresIn: null, token: null };

      const res = this.jwtService.decode(token) as IJwtPayload;
      const secondsLeft = this.utils.getSecondsLeft(moment.unix(res.exp));
      const expiresIn = secondsLeft + 's';
      if (secondsLeft <= 180) {
        return { token: this.jwtService.sign(req.user), expiresIn };
      }
      return { token, expiresIn };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  updateMePassword = async (
    id: string,
    data: UpdateMePasswordParams,
    i18n: I18nContext,
  ): Promise<string> => {
    try {
      const user = await this.userRepository.getUserByFilter({ id: id });
      if (!user) {
        throw this.error.handler(
          i18n.t('errors.userNotFound'),
          HttpStatus.NOT_FOUND,
        );
      }

      if (
        !(await this.utils.isHashMatch({
          password: data.currentPassword,
          hash: user.password,
        }))
      ) {
        throw this.error.handler(
          i18n.t('errors.invalidPassword'),
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.userRepository.updateUserDetails(user.id, {
        password: await this.utils.hashText(data.password),
      });

      return i18n.t('success.passwordUpdated');
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  resendVerificationCode = async (
    { email }: ResendCodeParams,
    i18n: I18nContext,
  ): Promise<SendVerificationCodeResponse> => {
    try {
      const user = await this.userRepository.getUserByFilter({
        email,
      });

      if (!user) {
        throw this.error.handler(
          i18n.t('errors.userNotFound'),
          HttpStatus.NOT_FOUND,
        );
      }

      const code = this.utils.generateRandomNumber();

      const expiresAt = this.utils.addMilliSecondsToDate(
        new Date(),
        AppConfig.verificationCodeExpiryInMilliSec,
      );

      const subject = i18n.t(`email.verificationCode`);

      const html = emailTemplates.verificationCode[i18n.lang]({
        subject,
        username: this.utils.getUserName(user),
        expiresAt: expiresAt.toString(),
        code,
      });

      await this.emailUtils.sendEmail({
        to: user.email,
        subject: subject + ': ' + code,
        html,
      });

      const cacheKey = this.utils.getUserCacheKey(user.id, 'VERIFICATION_CODE');

      console.log({ code });

      await this.cacheManager.set(
        cacheKey,
        code,
        AppConfig.verificationCodeExpiryInMilliSec,
      );

      return {
        message: i18n.t('success.codeSent'),
        payload: {
          sentTo: user.email,
          expirationInSec: AppConfig.verificationCodeExpiryInMilliSec / 1000,
        },
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  resetPassword = async (
    data: ResetPasswordParams,
    i18n: I18nContext,
  ): Promise<string> => {
    try {
      const user = await this.userRepository.getUserByFilter({
        email: data.email,
      });
      if (!user) {
        throw this.error.handler(
          i18n.t('errors.userNotFound'),
          HttpStatus.NOT_FOUND,
        );
      }

      const cacheKey = this.utils.getUserCacheKey(
        user.id,
        'VERIFICATION_CODE_REFERENCE',
      );
      const reference = await this.cacheManager.get(cacheKey);

      if (reference !== data.verificationReference) {
        throw this.error.handler(
          i18n.t('errors.sessionTimeout'),
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.userRepository.updateUserDetails(user.id, {
        password: await this.utils.hashText(data.password),
      } as any);

      return i18n.t('success.passwordReset');
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  verifyForgotPasswordCode = async (
    data: VerifyForgotPasswordCodeParams,
    i18n: I18nContext,
  ): Promise<VerifyForgotPasswordCodeResponse> => {
    try {
      const user = await this.userRepository.getUserByFilter({
        email: data.email,
      });
      if (!user) {
        throw this.error.handler(
          i18n.t('errors.userNotFound'),
          HttpStatus.NOT_FOUND,
        );
      }

      const cacheKey = this.utils.getUserCacheKey(user.id, 'VERIFICATION_CODE');
      const code = await this.cacheManager.get(cacheKey);

      console.log({ code });

      if (code !== data.code) {
        throw this.error.handler(
          i18n.t('errors.invalidVerificationCode'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const cacheRef = this.utils.getUserCacheKey(
        user.id,
        'VERIFICATION_CODE_REFERENCE',
      );

      const verificationReference = this.utils.generateReference();

      await this.cacheManager.set(
        cacheRef,
        verificationReference,
        60 * 10 * 1000, // 10 minutes
      );

      return {
        message: i18n.t('success.passwordReset'),
        payload: {
          verificationReference,
          email: user.email,
        },
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  verifyEmail = async (token: string, i18n: I18nContext) => {
    try {
      if (!token) {
        throw this.error.handler(
          i18n.t('errors.missingAuthHeader'),
          HttpStatus.BAD_GATEWAY,
        );
      }
      const payload = await this.jwtService.verify(token);

      if (!payload) {
        throw this.error.handler(
          i18n.t('errors.invalidVerificationLink'),
          HttpStatus.UNAUTHORIZED,
        );
      }

      const user = await this.userRepository.getUserByFilter({
        id: payload.userId,
      });

      if (!user) {
        throw this.error.handler(
          i18n.t('errors.invalidVerificationLink'),
          HttpStatus.UNAUTHORIZED,
        );
      }

      await this.userRepository.updateUserDetails(user.id, {
        isEmailVerified: true,
      });

      const fullPath = path.join(
        cwd(),
        './src/assets/emails/html/',
        user.locale.toLowerCase(),
        '/email_verified.html',
      );

      return {
        status: HttpStatus.OK,
        data: fullPath,
      };
    } catch (error) {
      if (error?.name === ErrorCode.expiredToken) {
        throw this.error.handler(
          i18n.t('errors.verificationLinkExpired'),
          HttpStatus.UNAUTHORIZED,
        );
      }

      throw this.error.handler(error);
    }
  };
}
