import { HttpStatus, Injectable } from '@nestjs/common';
import { AppLoggerUtils } from '../../utils/logger.utils';
import { SignUpUserParams, LoginUserParams } from '../dtos/user-auth.input';
import { UserResponse, UserEntity } from '../entities/user.entity';
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
import { ErrorCode } from 'config';

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

      const html = emailTemplates.newSignup.getTemplates[i18n.lang]({
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

      const html = emailTemplates.newSignup.getTemplates[i18n.lang]({
        subject,
        username: user.email,
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
          i18n.t('errors.userNotFound'),
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

      await this.userRepository.updateUserDetails({
        id: user.id,
        data: { isEmailVerified: true },
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
