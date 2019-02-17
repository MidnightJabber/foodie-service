import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLEnumType,
} from 'graphql';
import UnitType, { UnitInputType } from './unit';

export const MeasurementInputType = new GraphQLInputObjectType({
  name: 'MeasurementInputType',
  fields: {
    value: { type: GraphQLFloat },
    unit: { type: new GraphQLEnumType(UnitInputType) },
  },
});

const MeasurementType = new GraphQLObjectType({
  name: 'MeasurementType',
  fields: {
    value: {
      type: GraphQLFloat,
      description: 'Value of the measurement. ',
    },
    unit: {
      type: new GraphQLEnumType(UnitType),
      description: 'Unit of the measurement.',
    },
  },
});

export default MeasurementType;
