import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IsMatchArgs } from 'src/interfaces';
import { AppErrorUtils } from './error.utils';
import * as moment from 'moment';

@Injectable()
export class HelperUtils {
  constructor(private readonly error: AppErrorUtils) {}
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
}
