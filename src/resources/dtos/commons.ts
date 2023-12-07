import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonEntityParams {
  @Field(() => String, { nullable: true })
  createdBy?: string;

  @Field(() => String, { nullable: true })
  updatedBy?: string;

  @Field(() => String, { nullable: true })
  createdAt?: Date;

  @Field(() => String, { nullable: true })
  updatedAt?: Date;
}

@InputType()
export class CommonCreateParams {
  @Field(() => String, { nullable: true })
  createdBy?: string;

  @Field(() => String, { nullable: true })
  updatedBy?: string;
}
