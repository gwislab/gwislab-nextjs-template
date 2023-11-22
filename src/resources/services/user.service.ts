import { HttpStatus, Injectable } from '@nestjs/common';
import { AppLoggerUtils } from '../../utils/logger.utils';
import { SignUpUserInput, LoginUserInput } from '../dtos/user-auth.input';
import { SignupUserResponse, UserEntity } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories/user.repository';
import { AppErrorUtils } from '../../utils/error.utils';
import * as moment from 'moment';
import { I18nService } from 'nestjs-i18n';
import { HelperUtils } from 'utils';
import { IGetJwtPayload, IJwtPayload, IRequest } from 'interfaces';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: AppLoggerUtils,
    private readonly error: AppErrorUtils,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly utils: HelperUtils,
    private readonly i18n: I18nService,
  ) {
    this.logger.setContext(UserService.name);
  }

  signup = async (data: SignUpUserInput): Promise<SignupUserResponse> => {
    try {
      const userExist = await this.userRepository.getUserByFilter({
        email: data.email,
      });

      if (userExist) {
        throw this.error.handler(
          this.i18n.t('errors.userAlreadyExit'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.userRepository.saveUserDetails({
        ...data,
        password: await this.utils.hashText(data.password),
      } as any);

      const payload = { userId: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload);

      return {
        message: this.i18n.t('success.signupEmailSent'),
        payload: {
          ...user,
          token,
        },
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  login = async (data: LoginUserInput): Promise<SignupUserResponse> => {
    try {
      const user = await this.userRepository.getUserByFilter({
        email: data.email,
      });

      if (!user) {
        throw this.error.handler(
          this.i18n.t('errors.userNotFound'),
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
          this.i18n.t('errors.invalidPassword'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const payload = { userId: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload);

      return {
        message: this.i18n.t('success.success'),
        payload: {
          ...user,
          token,
        },
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  getMe = async (userId: string): Promise<SignupUserResponse> => {
    try {
      const user = await this.userRepository.getUserByFilter({
        id: userId,
      });

      if (!user) {
        throw this.error.handler(
          this.i18n.t('errors.userNotFound'),
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: this.i18n.t('success.success'),
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
}
