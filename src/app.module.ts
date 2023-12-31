import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entity/user.entity';
import { CandleModule } from './candle/candle.module';
import { Candle } from './candle/entity/candle.entity';
@Module({
  imports: [
    UserModule,
    AuthModule,
    CandleModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      definitions:{
        path: join(process.cwd(), 'src/graphql.ts'),

      }
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Password123#@!',
      database: 'tensorchange',
      entities: [User, Candle],
      synchronize: true,
    })
  ],
  providers: [AppResolver],

})
export class AppModule {}
