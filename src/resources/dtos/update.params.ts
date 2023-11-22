import {
  SaveServerDocumentParams,
  SaveUserDetailsParams,
} from './create-params';

export interface UpdateServerDocumentParams {
  id: string;
  data: Partial<SaveServerDocumentParams>;
}

export interface UpdateUserDetailsParams {
  id: string;
  data: Partial<SaveUserDetailsParams>;
}
