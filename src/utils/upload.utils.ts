import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { cwd } from 'process';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

@Injectable({ scope: Scope.TRANSIENT })
export class UploadUtils {
  static allowedImageExt = ['.png', '.jpg', '.jpeg'];
  static allowedDocExt = ['.pdf', '.xlsx', '.docx'];
  static allowedAudioExt = ['.mp3'];
  static allowedVideoExt = ['.mp4'];

  static storage = (folder: string) =>
    diskStorage({
      destination: path.join(cwd(), './uploads/', folder),
      filename: (req: any, file: any, cb: any) => {
        const filename: string =
          path.parse(file.originalname).name.replace(/\s/g, '') + randomUUID();
        const extension: string = path.parse(file.originalname).ext;
        cb(null, `${filename}${extension}`.toLowerCase());
      },
    });

  static allowedFiles = (
    req: any,
    file: any,
    callback: any,
    allowedExt: any = [],
  ) => {
    const ext: string = path.extname(file.originalname);
    if (!allowedExt.includes(ext.toLowerCase())) {
      req.fileValidationError = 'Invalid file type';
      return callback(new BadRequestException('Invalid file type'), false);
    }
    return callback(null, true);
  };
}
