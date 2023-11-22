import {
  Controller,
  Delete,
  Get,
  Header,
  Headers,
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
import { AuthGuard, IsAdmin } from 'guards';
import { IRequest } from 'interfaces';

@Controller('file')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  getContentRange(rangeStart: number, rangeEnd: number, fileSize: number) {
    return `bytes ${rangeStart}-${rangeEnd}/${fileSize}`;
  }

  @Get('/pv/:filename')
  @UseGuards(AuthGuard)
  async findPrivateFile(
    @Param('filename') filename: string,
    @I18n() i18n: I18nContext,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>> | Observable<any>> {
    try {
      const { status, ...responseData } =
        await this.documentsService.getServerDocument(filename);

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
  async findPublicFile(
    @Param('filename') filename: string,
    @I18n() i18n: I18nContext,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>> | Observable<any>> {
    try {
      const { status, ...responseData } =
        await this.documentsService.getServerDocument(filename);

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
        await this.documentsService.getServerDocument(filename);

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
        await this.documentsService.getServerDocument(filename);

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

  @Get('/pv/:filename/stream')
  @UseGuards(AuthGuard)
  @Header('Accept-Ranges', 'bytes')
  async streamPrivateFile(
    @Param('filename') filename: string,
    @I18n() i18n: I18nContext,
    @Headers('range') range: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<
    Response<any, Record<string, any>> | Observable<any> | StreamableFile
  > {
    try {
      if (!range) {
        res.status(HttpStatus.BAD_REQUEST).send({
          message: 'Invalid range header',
        });
      }

      const { status, ...responseData } =
        await this.documentsService.getServerDocument(filename);

      if (status !== HttpStatus.OK) {
        return res.status(status).send(responseData);
      }

      const document = responseData.data;

      const start = Number(range.replace(/\D/g, ''));
      const end = Math.min(
        start + AppConfig.streamChunkSize,
        document.size - 1,
      );
      const stream = createReadStream(document.fullPath, { start, end });

      const streamableFile = new StreamableFile(stream, {
        disposition: `inline; filename="${document.name}"`,
        type: document.type,
      });

      const contentRange = this.getContentRange(start, end, document.size);
      const contentLength = end - start + 1;

      res.status(206);
      res.set({
        'Content-Range': contentRange,
        'Content-Type': document.type,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Disposition': `attachment; filename="${document.name}"`,
      });

      return streamableFile;
    } catch (error) {
      throw new InternalServerErrorException(
        i18n.t('errors.somethingWentWrong'),
      );
    }
  }

  @Get('/pb/:filename/stream')
  @Header('Accept-Ranges', 'bytes')
  async streamPublicFile(
    @Param('filename') filename: string,
    @I18n() i18n: I18nContext,
    @Headers('range') range: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<
    Response<any, Record<string, any>> | Observable<any> | StreamableFile
  > {
    try {
      if (!range) {
        res.status(HttpStatus.BAD_REQUEST).send({
          message: 'Invalid range header',
        });
      }

      const { status, ...responseData } =
        await this.documentsService.getServerDocument(filename);

      if (status !== HttpStatus.OK) {
        return res.status(status).send(responseData);
      }

      const document = responseData.data;

      const start = Number(range.replace(/\D/g, ''));
      const end = Math.min(
        start + AppConfig.streamChunkSize,
        document.size - 1,
      );
      const stream = createReadStream(document.fullPath, { start, end });

      const streamableFile = new StreamableFile(stream, {
        disposition: `inline; filename="${document.name}"`,
        type: document.type,
      });

      const contentRange = this.getContentRange(start, end, document.size);
      const contentLength = end - start + 1;

      res.status(206);
      res.set({
        'Content-Range': contentRange,
        'Content-Type': document.type,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
      });

      return streamableFile;
    } catch (error) {
      throw new InternalServerErrorException(
        i18n.t('errors.somethingWentWrong'),
      );
    }
  }

  @Get('/pb/:filename/serve')
  async servePublicFile(
    @Param('filename') filename: string,
    @I18n() i18n: I18nContext,
    @Res() res: Response,
  ): Promise<
    Response<any, Record<string, any>> | Observable<any> | StreamableFile
  > {
    try {
      const { status, ...responseData } =
        await this.documentsService.getServerDocument(filename);

      if (status !== HttpStatus.OK) {
        return res.status(status).send(responseData);
      }

      const document = responseData.data;

      const stream = createReadStream(document.fullPath);

      stream.pipe(res);
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

  @Post('/upload/public/document')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req: any, file: any, callback: any) =>
        UploadUtils.allowedFiles(
          req,
          file,
          callback,
          UploadUtils.allowedDocExt,
        ),
      storage: UploadUtils.storage('documents/public'),
      limits: {
        fileSize: AppConfig.maxFileSize,
      },
    }),
  )
  async createPublicDocumentFile(
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

  @Post('/upload/private/document')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req: any, file: any, callback: any) =>
        UploadUtils.allowedFiles(
          req,
          file,
          callback,
          UploadUtils.allowedDocExt,
        ),
      storage: UploadUtils.storage('documents/private'),
      limits: {
        fileSize: AppConfig.maxFileSize,
      },
    }),
  )
  async createPrivateDocumentFile(
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

  @Post('/upload/public/audio')
  @UseGuards(IsAdmin)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req: any, file: any, callback: any) =>
        UploadUtils.allowedFiles(
          req,
          file,
          callback,
          UploadUtils.allowedAudioExt,
        ),
      storage: UploadUtils.storage('audios/public'),
      limits: {
        fileSize: AppConfig.maxFileSize,
      },
    }),
  )
  async createPublicAudioFile(
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

  @Post('/upload/private/audio')
  @UseGuards(IsAdmin)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req: any, file: any, callback: any) =>
        UploadUtils.allowedFiles(
          req,
          file,
          callback,
          UploadUtils.allowedAudioExt,
        ),
      storage: UploadUtils.storage('audios/private'),
      limits: {
        fileSize: AppConfig.maxFileSize,
      },
    }),
  )
  async createPrivateAudioFile(
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

  @Post('/upload/public/video')
  @UseGuards(IsAdmin)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req: any, file: any, callback: any) =>
        UploadUtils.allowedFiles(
          req,
          file,
          callback,
          UploadUtils.allowedVideoExt,
        ),
      storage: UploadUtils.storage('videos/public'),
      limits: {
        fileSize: AppConfig.maxVideoSize,
      },
    }),
  )
  async createPublicVideoFile(
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

  @Post('/upload/private/video')
  @UseGuards(IsAdmin)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req: any, file: any, callback: any) =>
        UploadUtils.allowedFiles(
          req,
          file,
          callback,
          UploadUtils.allowedVideoExt,
        ),
      storage: UploadUtils.storage('videos/private'),
      limits: {
        fileSize: AppConfig.maxVideoSize,
      },
    }),
  )
  async createPrivateVideoFile(
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

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteDocument(
    @Req() req: IRequest,
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const { status, ...responseData } =
        await this.documentsService.deleteServerDocument(id, req.user);

      return res.status(status).send(responseData);
    } catch (error) {
      throw new InternalServerErrorException(
        i18n.t('errors.somethingWentWrong'),
      );
    }
  }
}
