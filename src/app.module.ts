import { Module } from '@nestjs/common';
import { MetricModule } from './metric/metric.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    MongooseModule.forRoot(
      process.env.DB_URI ?? 'mongodb://localhost:27017/metric_db',
    ),
    MetricModule,
  ],
})
export class AppModule {}
