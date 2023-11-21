import { ELocale, PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';
import { PubSub } from 'graphql-subscriptions';

interface RequestExt {
  token: string;
  user: User;
}

export type IRequest = RequestExt & Request;

export default interface AppContext {
  jwt?: string;
  prisma: PrismaClient;
  req: IRequest;
  res: Response;
  pubsub: PubSub;
  locale: ELocale;
}

export interface IJwtPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface IGetJwtPayload {
  token: string;
  expiresIn: string;
}
