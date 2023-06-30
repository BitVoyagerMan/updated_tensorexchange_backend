import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@ObjectType({description: "candle"})
@Entity("candle")
export class Candle {

    @Field(() => ID)
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column()
    timeframe: string;

    @Field()
    @Column()
    time: Date;

    @Field()
    @Column({type:'bigint'})
    open: string;
    
    @Field()
    @Column({type:'bigint'})
    high: string;

    @Field()
    @Column({type:'bigint'})
    low: string;

    @Field()
    @Column({type:'bigint'})
    close: string;

}