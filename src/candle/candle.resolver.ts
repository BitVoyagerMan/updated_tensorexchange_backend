import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";

import { Candle } from "./entity/candle.entity";
import { UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/jwt.guard";
import { AuthGuard } from "src/auth/auth.guard";
import { CandleService } from "./candle.service";



@Resolver()
export class CandleResolver {
    constructor(private readonly candleService: CandleService){}
    
    @Query(() => [Candle])
    async allCandles(){
        console.log("sssss")
        return await this.candleService.getAllCandles();
    }

}