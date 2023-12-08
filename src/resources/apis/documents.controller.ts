import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { DocumentsService } from '../services/documents.service';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AppConfig } from 'config';
import { UploadUtils } from 'utils';
import { User } from '@prisma/client';
import { AuthGuard } from 'guards';
import { IRequest } from 'interfaces';

@Controller('file')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get('/pv/:filename')
  @UseGuards(AuthGuard)
  async findPrivateFile(
    @Param('filename') filename: string,
    @I18n() i18n: I18nContext,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>> | Observable<any>> {
    try {
      const { status, ...responseData } =
        await this.documentsService.getOneServerDocument(filename);

      if (status !== HttpStatus.OK) {
        return res.status(status).send(responseData);
      }
      return of(
        res.sendFile(`${responseData.data.fullPath}`),
        res.status(status),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        i18n.t('errors.somethingWentWrong'),
      );
    }
  }

  @Get('/pb/:filename')
  async getPublicFile(
    @Param('filename') filename: string,
    @I18n() i18n: I18nContext,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>> | Observable<any>> {
    try {
      const { status, ...responseData } =
        await this.documentsService.getOneServerDocument(filename);

      if (status !== HttpStatus.OK) {
        return res.status(status).send(responseData);
      }
      return of(
        res.sendFile(`${responseData.data.fullPath}`),
        res.status(status),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        i18n.t('errors.somethingWentWrong'),
      );
    }
  }

  @Get('/pv/:filename/download')
  @UseGuards(AuthGuard)
  async downloadPrivateFile(
    @Param('filename') filename: string,
    @I18n() i18n: I18nContext,
    @Res({ passthrough: true }) res: Response,
  ): Promise<
    Response<any, Record<string, any>> | Observable<any> | StreamableFile
  > {
    try {
      const { status, ...responseData } =
        await this.documentsService.getOneServerDocument(filename);

      if (status !== HttpStatus.OK) {
        return res.status(status).send(responseData);
      }

      const document = responseData.data;

      const file = createReadStream(document.fullPath);

      res.set({
        'Content-Type': document.type,
        'Content-Disposition': `attachment; filename="${document.name}"`,
      });

      return new StreamableFile(file);
    } catch (error) {
      throw new InternalServerErrorException(
        i18n.t('errors.somethingWentWrong'),
      );
    }
  }

  @Get('/pb/:filename/download')
  async downloadPublicFile(
    @Param('filename') filename: string,
    @I18n() i18n: I18nContext,
    @Res({ passthrough: true }) res: Response,
  ): Promise<
    Response<any, Record<string, any>> | Observable<any> | StreamableFile
  > {
    try {
      const { status, ...responseData } =
        await this.documentsService.getOneServerDocument(filename);

      if (status !== HttpStatus.OK) {
        return res.status(status).send(responseData);
      }

      const document = responseData.data;

      const file = createReadStream(document.fullPath);

      res.set({
        'Content-Type': document.type,
        'Content-Disposition': `attachment; filename="${document.name}"`,
      });

      return new StreamableFile(file);
    } catch (error) {
      throw new InternalServerErrorException(
        i18n.t('errors.somethingWentWrong'),
      );
    }
  }

  @Post('/upload/public/image')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req: any, file: any, callback: any) =>
        UploadUtils.allowedFiles(
          req,
          file,
          callback,
          UploadUtils.allowedImageExt,
        ),
      storage: UploadUtils.storage('images/public'),
      limits: {
        fileSize: AppConfig.maxFileSize,
      },
    }),
  )
  async createPublicImageFile(
    @Res() res: Response,
    @Req() req: IRequest,
    @I18n() i18n: I18nContext,
    @UploadedFile() file: any,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const { status, ...responseData } =
        await this.documentsService.createServerDocument(
          file,
          req.user as User,
          true,
        );
      return res.status(status).send(responseData);
    } catch (error) {
      throw new InternalServerErrorException(
        i18n.t('errors.somethingWentWrong'),
      );
    }
  }

  @Post('/upload/private/image')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req: any, file: any, callback: any) =>
        UploadUtils.allowedFiles(
          req,
          file,
          callback,
          UploadUtils.allowedImageExt,
        ),
      storage: UploadUtils.storage('images/private'),
      limits: {
        fileSize: AppConfig.maxFileSize,
      },
    }),
  )
  async createPrivateImageFile(
    @Res() res: Response,
    @Req() req: IRequest,
    @I18n() i18n: I18nContext,
    @UploadedFile() file: any,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const { status, ...responseData } =
        await this.documentsService.createServerDocument(
          file,
          req.user as User,
        );
      return res.status(status).send(responseData);
    } catch (error) {
      throw new InternalServerErrorException(
        i18n.t('errors.somethingWentWrong'),
      );
    }
  }
}
