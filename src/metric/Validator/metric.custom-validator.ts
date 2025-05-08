import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";
import {DegreeUnitValue, DistanceUnitValue, MetricTypeValues} from "../schema/metric.schema";

export function IsUnitMatchingType(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isUnitMatchingType',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const type = (args.object as any).type;
                    if (type === MetricTypeValues.distance) return Object.values(DistanceUnitValue).includes(value);
                    if (type === MetricTypeValues.temperature) return Object.values(DegreeUnitValue).includes(value);
                    return false;
                },
                defaultMessage(args: ValidationArguments) {
                    const type = (args.object as any).type;
                    return `unit is not valid for type '${type}'`;
                },
            },
        });
    };
}