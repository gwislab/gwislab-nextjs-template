import { CommonEntityParams } from 'resources/dtos';

export class ServerDocumentEntity extends CommonEntityParams {
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
