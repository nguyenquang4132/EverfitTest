import { Module } from '@nestjs/common';
import { MetricController } from './metric.controller';
import { MetricService } from './metric.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Metric, MetricSchema} from "./schema/metric.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Metric.name, schema: MetricSchema }
        ]),
    ],
    controllers: [MetricController],
    providers: [MetricService],
})
export class MetricModule {}