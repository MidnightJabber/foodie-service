import mongoose from 'mongoose';
import Measurement from './measurement';

const { Schema } = mongoose;

const FoodSchema = new Schema({
  name: String,
  createDate: Date,
  lastUpdated: Date,
  servingSize: Measurement,
  calories: Number,
  nutrition: {
    protein: {},
    fat: Measurement,
    carbohydrate: {
      sugar: Measurement,
      dietaryFiber: Measurement,
      starch: Measurement,
      sugarAlcohols: Measurement,
      total: Measurement,
    },
    cholesterol: Measurement,
    sodium: Measurement,
    potassium: Measurement,
    vitamin: {
      A: Measurement,
      B: Measurement,
      B6: Measurement,
      C: Measurement,
      D: Measurement,
    },
    calcium: Measurement,
    iron: Measurement,
    magnesium: Measurement,
    cobalamin: Measurement,
  },
}, {
  timestamps: {
    createdAt: 'createDate',
    updatedAt: 'lastUpdated',
  },
  versionKey: 'version',
});

mongoose.model('food', FoodSchema);
