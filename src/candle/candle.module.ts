import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candle } from './entity/candle.entity';
import { CandleService } from './candle.service';
import { CandleResolver } from './candle.resolver';
@Module({
  imports: [TypeOrmModule.forFeature([Candle])],
  controllers: [],
  providers: [CandleService, CandleResolver],
  exports: [CandleService]

})
export class CandleModule {}