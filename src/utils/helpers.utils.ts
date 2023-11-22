import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppErrorUtils } from './error.utils';
import * as moment from 'moment';
import { IsMatchArgs } from 'interfaces';
import { JwtService } from '@nestjs/jwt';
import { AppLoggerUtils } from './logger.utils';
import { User } from '@prisma/client';
import { AppConfig } from 'config';

@Injectable()
export class HelperUtils {
  constructor(
    private readonly error: AppErrorUtils,
    private readonly logger: AppLoggerUtils,
    private readonly jwtService: JwtService,
  ) {
    this.logger.setContext(HelperUtils.name);
  }
  saltOrRounds = 10;

  hashText = async (password: string) => {
    try {
      return await bcrypt.hash(password, this.saltOrRounds);
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  isHashMatch = async ({ hash, password }: IsMatchArgs) => {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  getSecondsLeft = (date: moment.Moment) =>
    moment(date).diff(moment(), 'seconds');

  addSecondsToDate = (date: Date, seconds: number) =>
    moment(date).add(seconds, 'seconds');

  generateEmailLink = async (user: User) => {
    try {
      const expiresAt = this.addSecondsToDate(
        new Date(),
        AppConfig.emailJwtExpirySec,
      );

      const payload = { userId: user.id, email: user.email };

      const token = await this.jwtService.signAsync(payload, {
        expiresIn: AppConfig.emailJwtExpirySec,
      });

      return {
        verificationLink: `${AppConfig.serverUrl}/verify-email/${token}`,
        expiresAt: expiresAt.toString(),
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  static removeNulls = (obj: any) => {
    Object.keys(obj).forEach(
      (key) => (obj[key] == null || obj[key] == undefined) && delete obj[key],
    );
    return obj;
  };

  static structureError = (property: string, message: string) => ({
    property,
    message,
  });
}
