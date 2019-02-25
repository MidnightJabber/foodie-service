import mongoose from 'mongoose';
import Measurement from './measurement';

const { Schema } = mongoose;

const BodyStatSchema = new Schema(
  {
    associatedUser: Schema.Types.ObjectId,
    bodyWeight: Measurement,
    bodyFat: Measurement,
    waterWeight: Measurement,
    boneDensity: Measurement,
    muscleMass: Measurement,
    neck: Measurement,
    waist: Measurement,
    hips: Measurement,
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: 'createDate',
      updatedAt: 'lastUpdated',
    },
    versionKey: 'version',
  },
);

mongoose.model('bodyStat', BodyStatSchema);
