import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field({ nullable: false })
  username: string;
  @Field({nullable:false})
  password: string;

}
