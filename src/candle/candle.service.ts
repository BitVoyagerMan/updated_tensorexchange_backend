import { Repository } from "typeorm";
import { Candle } from "./entity/candle.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
@Injectable()
export class CandleService{
    constructor(@InjectRepository(Candle) public readonly candleRepo: Repository<Candle>){}
    async getAllCandles() {
        let result: Candle[] = await this.candleRepo.find();
        return result;
    }
    
    
}