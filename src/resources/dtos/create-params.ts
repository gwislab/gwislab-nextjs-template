import { ServerDocumentEntity, UserEntity } from 'resources/entities';

export interface SaveUserDetailsParams extends Omit<UserEntity, 'id'> {}
export interface SaveServerDocumentParams
  extends Omit<ServerDocumentEntity, 'id'> {}
