import { CommonCreateParams } from 'resources/dtos';

export class ServerDocumentEntity extends CommonCreateParams {
  id: string;
  name?: string;
  url?: string;
  size?: number;
  originalName?: string;
  fullPath?: string;
  destination?: string;
  type?: string;
  reference?: string;
  extraData?: any;
  isPublic: boolean;
}
