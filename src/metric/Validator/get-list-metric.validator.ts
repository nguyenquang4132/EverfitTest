import {
  IsNotEmpty,
  IsString,
  IsIn,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { MetricType, MetricTypeValues, Unit } from '../schema/metric.schema';
import { IsUnitMatchingType } from './metric.custom-validator';

export class GetListMetricValidate {
  @IsNotEmpty()
  @IsString()
  @IsIn([MetricTypeValues.distance, MetricTypeValues.temperature])
  type: MetricType;

  @IsOptional()
  @IsString()
  @IsUnitMatchingType()
  unit?: Unit;
}
