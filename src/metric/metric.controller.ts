import { Body, Controller, Get, Post } from '@nestjs/common';
import { MetricService } from './metric.service';
import { CreateMetricValidate } from './Validator/create-metric.validator';
import { GetListMetricValidate } from './Validator/get-list-metric.validator';
import { GetMetricChartValidate } from './Validator/get-metric-chart';

@Controller('metrics')
export class MetricController {
  constructor(private readonly service: MetricService) {}

  @Post()
  create(@Body() body: CreateMetricValidate) {
    return this.service.create(body);
  }

  @Get()
  getList(@Body() body: GetListMetricValidate) {
    return this.service.list(body.type, body.unit);
  }

  @Get('/chart')
  getMetricChart(@Body() body: GetMetricChartValidate) {
    return this.service.chartData(
      body.type,
      body.fromDate,
      body.toDate,
      body.unit,
    );
  }
}
