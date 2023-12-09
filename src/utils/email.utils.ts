import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';
import { AppConfig } from 'config';
import { AppLoggerUtils } from './logger.utils';
import config from 'config/config';

@Injectable()
export class EmailUtils {
  constructor(private readonly logger: AppLoggerUtils) {
    this.logger.setContext(EmailUtils.name);
  }
  sendEmail = async (params: { to: string; html: string; subject: string }) => {
    if (config.isTestEnv) {
      return true;
    }
    try {
      const host = AppConfig.emailHost,
        port = AppConfig.emailPort,
        user = AppConfig.emailUser,
        sender = AppConfig.appName,
        pass = AppConfig.emailUserPassword,
        secure = true;

      const { to, html, subject } = params;

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail({
        sender,
        from: `${sender}<${user}>`,
        to,
        subject,
        html,
      });

      return true;
    } catch (err) {
      this.logger.log(
        JSON.stringify({ err, code: err.code, message: err?.message }),
      );
      return false;
    }
  };
}
