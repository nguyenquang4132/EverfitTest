import {
  IsNotEmpty,
  IsString,
  IsIn,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { MetricType, MetricTypeValues, Unit } from '../schema/metric.schema';
import { IsUnitMatchingType } from './metric.custom-validator';

export class GetMetricChartValidate {
  @IsNotEmpty()
  @IsString()
  @IsIn([MetricTypeValues.distance, MetricTypeValues.temperature])
  type: MetricType;

  @IsNotEmpty()
  @IsDateString()
  fromDate: Date;

  @IsNotEmpty()
  @IsDateString()
  toDate: Date;

  @IsOptional()
  @IsString()
  @IsUnitMatchingType()
  unit?: Unit;
}
