import mongoose from 'mongoose';

const { Schema } = mongoose;

const IngredientSchema = new Schema({
  name: String,
  createDate: Date,
  lastUpdated: Date,
  nutrition: {
    protein: Number,
    fat: Number,
    carbohydrate: {
      sugar: Number,
      dietaryFiber: Number,
      starch: Number,
      sugarAlcohols: Number,
      total: Number,
    },
    cholesterol: Number,
    sodium: Number,
    potassium: Number,
    vitamin: {
      A: Number,
      B: Number,
      B6: Number,
      C: Number,
      D: Number,
    },
    calcium: Number,
    iron: Number,
    magnesium: Number,
    cobalamin: Number,
  },
});

mongoose.model('ingredient', IngredientSchema);
