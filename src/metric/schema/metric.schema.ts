import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MetricDocument = Metric & Document;

export type MetricType = 'Distance' | 'Temperature';
export type Unit =
  | 'meter'
  | 'centimeter'
  | 'inch'
  | 'feet'
  | 'yard'
  | 'celsius'
  | 'fahrenheit'
  | 'kelvin';

export const MetricTypeValues = Object.freeze({
  distance: 'Distance',
  temperature: 'Temperature',
});

export const DistanceUnitValue = Object.freeze({
  meter: 'meter',
  centimeter: 'centimeter',
  inch: 'inch',
  feet: 'feet',
  yard: 'yard',
});

export const DegreeUnitValue = Object.freeze({
  celsius: 'celsius',
  fahrenheit: 'fahrenheit',
  kelvin: 'kelvin',
});

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Metric {
  @Prop({ required: true })
  type: MetricType;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  standardValue: number;

  @Prop({ required: true })
  unit: Unit;

  @Prop({ required: true })
  date: Date;
}

export const MetricSchema = SchemaFactory.createForClass(Metric);
