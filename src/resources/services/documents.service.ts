import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AppConfig } from 'config';
import { ServerDocumentRepository } from 'resources/repositories';

@Injectable()
export class DocumentsService {
  constructor(private readonly serverDocumentRepo: ServerDocumentRepository) {}
  async createServerDocument(file: any, user: User, isPublic = false) {
    try {
      const document = await this.serverDocumentRepo.saveServerDocumentDetails({
        name: file.filename,
        originalName: file.originalname,
        type: file.mimetype,
        fullPath: file.path,
        size: file.size,
        url: `${AppConfig.serverUrl}/file/${isPublic ? 'pb' : 'pv'}/${
          file.filename
        }`,
        isPublic,
        destination: file.destination,
        createdBy: user.id,
      });

      return {
        status: HttpStatus.OK,
        message: 'Successfully Uploaded',
        data: {
          id: document.id,
          url: document.url,
          name: document.originalName,
          createdBy: document.createdBy,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async getOneServerDocument(name: string) {
    try {
      const file = await this.serverDocumentRepo.getServerDocumentByFilter({
        name,
      });
      if (!file || !file.isPublic) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'File not found',
        };
      }
      return {
        status: HttpStatus.OK,
        data: file,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async deleteServerDocument(id: string, user: User) {
    try {
      const file = await this.serverDocumentRepo.getServerDocumentByFilter({
        id,
        createdBy: user.id,
      });
      if (!file) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Cannot delete this file',
        };
      }
      await this.serverDocumentRepo.deleteServerDocument(id);
      return {
        status: HttpStatus.OK,
        message: 'Successfully Deleted',
        data: {
          id: file.id,
          url: file.url,
          name: file.originalName,
          createdBy: file.createdBy,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
