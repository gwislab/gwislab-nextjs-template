import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonCreateParams {
  @Field(() => String)
  createdBy?: string;

  @Field(() => String)
  updatedBy?: string;

  @Field(() => String)
  createdAt?: Date;

  @Field(() => String)
  updatedAt?: Date;
}

export class IPaginateCommonsParams {
  page?: number;
  limit?: number;
}

export interface CommonFilterParams extends Partial<CommonCreateParams> {
  id?: string;
}
