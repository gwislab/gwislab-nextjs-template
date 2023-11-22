import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { join } from 'path';
import { AppLoggerUtils } from './utils/logger.utils';
import prisma from './lib/prisma';
import { JwtModule } from '@nestjs/jwt';
import { RepositoryModule } from './resources/repositories/index.module';
import { UtilsModule } from './utils/index.module';
import { GraphQLError } from 'graphql';
import { HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { PubSub } from 'graphql-subscriptions';
import { ResolverModule } from 'resources/resolvers/index.module';
import { ApiModule } from 'resources/apis/index.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { GlobalInterceptor } from 'interceptors';
import { GlobalParamsValidator } from 'pipes';

const langOptions = ['lang', 'Accept-Language', 'language'];

const logger = new AppLoggerUtils();
const pubsub = new PubSub();

@Module({
  imports: [
    ConfigModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: config.defaultLanguage,
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        {
          use: HeaderResolver,
          options: langOptions,
        },
        {
          use: QueryResolver,
          options: langOptions,
        },
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
      },
      debug: config.isDevEnv,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: (ctx: any) => {
        logger.setContext('AppModule:context');
        let locale = config.defaultLanguage;

        if (ctx?.req?.headers) {
          const lang = langOptions.find((option) => ctx.req?.headers?.[option]);
          locale = ctx.req.headers[lang];
        }

        return {
          ...ctx,
          locale,
          prisma,
          pubsub,
        };
      },
      formatError: (error: GraphQLError): any => {
        logger.setContext('AppModule:formatError');

        return error;
      },
    }),
    JwtModule.register({
      global: true,
      secret: config.jwtSecret,
      signOptions: { expiresIn: config.jwtExpiresIn },
    }),
    ResolverModule,
    RepositoryModule,
    UtilsModule,
    ApiModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: GlobalParamsValidator,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalInterceptor,
    },
  ],
})
export class AppModule {}
