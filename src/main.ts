import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';
import prisma from './lib/prisma';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import './resources/dtos/enums';
import { runBootstrap } from 'config/bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  prisma.$use(async (params, next) => {
    // Check incoming query type
    if (params.action == 'delete') {
      // Delete queries
      // Change action to an update
      params.action = 'update';
      params.args['data'] = { deletedAt: new Date() };
    } else if (params.action == 'deleteMany') {
      // Delete many queries
      params.action = 'updateMany';
      if (params.args.data != undefined) {
        params.args.data['deletedAt'] = new Date();
      } else {
        params.args['data'] = { deletedAt: new Date() };
      }
    } else if (params.action === 'findFirst') {
    }
    return next(params);
  });

  await prisma.$connect();

  runBootstrap(prisma);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );
  await app.listen(config.port);
}
bootstrap();
