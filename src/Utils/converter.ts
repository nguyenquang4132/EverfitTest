import { Unit, DegreeUnitValue } from '../metric/schema/metric.schema';

export const meterTable = Object.freeze({
  meter: 1,
  centimeter: 0.01,
  inch: 0.0254,
  feet: 0.3048,
  yard: 0.9144,
});

export function convertDistanceToStandard(value: number, unit: Unit): number {
  return value * meterTable[unit];
}

export function convertTemperatureToStandard(
  value: number,
  unit: Unit,
): number {
  let result = value;

  // Standard value would be meter
  switch (unit) {
    case DegreeUnitValue.fahrenheit:
      result = ((value - 32) * 5) / 9;
      break;
    case DegreeUnitValue.kelvin:
      result = value - 273.15;
      break;
  }

  return result;
}

export function convertDistance(value: number, to: Unit): number {
  return value / meterTable[to];
}

export function convertTemperature(celsiusValue: number, to: Unit): number {
  let result = celsiusValue;
  switch (to) {
    case DegreeUnitValue.fahrenheit:
      result = (celsiusValue * 9) / 5 + 32;
      break;
    case DegreeUnitValue.kelvin:
      result = celsiusValue + 273.15;
      break;
  }

  return result;
}
