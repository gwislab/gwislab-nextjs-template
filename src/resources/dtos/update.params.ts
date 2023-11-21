import { SaveServerDocumentParams } from './create-params';

export interface UpdateUserDetailsParams {
  id: string;
  data: Partial<SaveServerDocumentParams>;
}
