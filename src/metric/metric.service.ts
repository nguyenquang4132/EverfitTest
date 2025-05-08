import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Metric,
  MetricDocument,
  MetricType,
  MetricTypeValues,
  Unit,
} from './schema/metric.schema';
import { CreateMetricValidate } from './Validator/create-metric.validator';
import {
  convertDistance,
  convertDistanceToStandard,
  convertTemperature,
  convertTemperatureToStandard,
} from '../Utils/converter';

@Injectable()
export class MetricService {
  constructor(
    @InjectModel(Metric.name) private metricModel: Model<MetricDocument>,
  ) {}

  async create(data: CreateMetricValidate): Promise<Metric> {
    // Convert to standard value to reduce get list/chart data calculation, standard value would be meter/celsius
    return this.metricModel.create({
      ...data,
      standardValue: this.convertStandard(data.type, data.value, data.unit),
    });
  }

  async list(type: string, unit?: Unit): Promise<Metric[]> {
    const metrics = await this.metricModel.find({ type }).exec();
    return metrics.map((m) => ({
      ...m.toObject(),
      value: unit ? this.convertValue(m, unit) : m.value,
      unit: unit ?? m.unit,
    }));
  }

  async chartData(
    type: MetricType,
    fromDate: Date,
    toDate: Date,
    unit?: Unit,
  ): Promise<Metric[]> {
    const metrics = await this.metricModel.aggregate([
      {
        $match: {
          type: type,
          date: { $gte: new Date(fromDate), $lte: new Date(toDate) },
        },
      },
      {
        $sort: { date: -1 },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            day: { $dayOfMonth: '$date' },
          },
          latest: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: { newRoot: '$latest' },
      },
      {
        $sort: { date: 1 },
      },
      {
        $addFields: {
          id: '$_id',
        },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
        },
      },
    ]);
    return metrics.map((m) => ({
      ...m,
      value: unit ? this.convertValue(m, unit) : m.value,
      unit: unit ?? m.unit,
    }));
  }

  private convertValue(metric: Metric, target: Unit): number {
    return metric.type === MetricTypeValues.distance
      ? convertDistance(metric.standardValue, target)
      : convertTemperature(metric.standardValue, target);
  }

  private convertStandard(
    metric: MetricType,
    value: number,
    unit: Unit,
  ): number {
    return metric === MetricTypeValues.distance
      ? convertDistanceToStandard(value, unit)
      : convertTemperatureToStandard(value, unit);
  }
}
