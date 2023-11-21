import { ServerDocumentEntity, UserEntity } from 'resources/entities';

export interface GetUserParams extends Partial<UserEntity> {}
export interface GetServerDocumentParams
  extends Partial<ServerDocumentEntity> {}
