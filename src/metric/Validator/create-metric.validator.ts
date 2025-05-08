import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsIn,
  IsDateString,
} from 'class-validator';
import { MetricType, MetricTypeValues, Unit } from '../schema/metric.schema';
import { IsUnitMatchingType } from './metric.custom-validator';

export class CreateMetricValidate {
  @IsNotEmpty()
  @IsString()
  @IsIn([MetricTypeValues.distance, MetricTypeValues.temperature])
  type: MetricType;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  @IsUnitMatchingType()
  unit: Unit;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}
