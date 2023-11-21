export class CommonCreateParams {
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class IPaginateCommonsParams {
  page?: number;
  limit?: number;
}

export interface CommonFilterParams extends Partial<CommonCreateParams> {
  id?: string;
}
