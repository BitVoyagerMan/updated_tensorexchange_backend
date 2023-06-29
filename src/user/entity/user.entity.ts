import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@ObjectType({description: "user"})
@Entity("user")
export class User {

    @Field(() => ID)
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column()
    username: string;

    @Field()
    @Column()
    email: string;


    @Column()
    password: string;
    
    @Field()
    @Column()
    role: string;

    @Field()
    @Column()
    is_verified: Boolean;
}