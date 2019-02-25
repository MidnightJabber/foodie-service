import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import GraphQLDate from 'graphql-date';
import MeasurementType, { MeasurementInputType } from './measurement';

const BodyStatType = new GraphQLObjectType({
  name: 'BodyStatType',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier for the body stat.',
    },
    associatedUser: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier of the associated user.',
    },
    bodyWeight: {
      type: MeasurementType,
      description: 'Total body weight for the day.',
    },
    bodyFat: {
      type: MeasurementType,
      description: 'Total weight of the body caused by fats.',
    },
    waterWeight: {
      type: MeasurementType,
      description: 'Total weight of the body caused by water.',
    },
    boneDensity: {
      type: MeasurementType,
      description: 'Bone density, or bone mineral density, is the amount of bone mineral in bone tissue.',
    },
    muscleMass: {
      type: MeasurementType,
      description: 'Total weight of the muscles in your body.',
    },
    neck: {
      type: MeasurementType,
      description: 'Measurements of your neck.',
    },
    waist: {
      type: MeasurementType,
      description: 'Measurements of your waist.',
    },
    hips: {
      type: MeasurementType,
      description: 'Measurements of your hips.',
    },
    date: {
      type: GraphQLDate,
      description: 'Tracking date of the body stat.',
    },
    createDate: {
      type: GraphQLDate,
      description: 'Date on which the body stat was created.',
    },
    lastUpdated: {
      type: GraphQLDate,
      description: 'Date on which the body stat was last updated.',
    },
    version: {
      type: GraphQLInt,
      description: 'Latest iteration number based on history.',
    },
  },
});

export const BodyStatCreateInputType = new GraphQLInputObjectType({
  name: 'BodyStatCreateInputType',
  fields: {
    associatedUser: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identified for the associated user.',
    },
    bodyWeight: {
      type: MeasurementInputType,
      description: 'Total body weight for the day.',
    },
    bodyFat: {
      type: MeasurementInputType,
      description: 'Total weight of the body caused by fats.',
    },
    waterWeight: {
      type: MeasurementInputType,
      description: 'Total weight of the body caused by water.',
    },
    boneDensity: {
      type: MeasurementInputType,
      description: 'Bone density, or bone mineral density, is the amount of bone mineral in bone tissue.',
    },
    muscleMass: {
      type: MeasurementInputType,
      description: 'Total weight of the muscles in your body.',
    },
    neck: {
      type: MeasurementInputType,
      description: 'Measurements of your neck.',
    },
    waist: {
      type: MeasurementInputType,
      description: 'Measurements of your waist.',
    },
    hips: {
      type: MeasurementInputType,
      description: 'Measurements of your hips.',
    },
    date: {
      type: GraphQLDate,
      description: 'Tracking date of the body stat.',
    },
  },
});

export const BodyStatEditInputType = new GraphQLInputObjectType({
  name: 'BodyStatEditInputType',
  fields: {
    bodyWeight: {
      type: MeasurementInputType,
      description: 'Total body weight for the day.',
    },
    bodyFat: {
      type: MeasurementInputType,
      description: 'Total weight of the body caused by fats.',
    },
    waterWeight: {
      type: MeasurementInputType,
      description: 'Total weight of the body caused by water.',
    },
    boneDensity: {
      type: MeasurementInputType,
      description: 'Bone density, or bone mineral density, is the amount of bone mineral in bone tissue.',
    },
    muscleMass: {
      type: MeasurementInputType,
      description: 'Total weight of the muscles in your body.',
    },
    neck: {
      type: MeasurementInputType,
      description: 'Measurements of your neck.',
    },
    waist: {
      type: MeasurementInputType,
      description: 'Measurements of your waist.',
    },
    hips: {
      type: MeasurementInputType,
      description: 'Measurements of your hips.',
    },
    date: {
      type: GraphQLDate,
      description: 'Tracking date of the body stat.',
    },
  },
});

export default BodyStatType;
