import mongoose, { Schema } from 'mongoose';

const IngredientSchema = new Schema({
  name: { type: String, required: [true, 'Name is a required field'] },
});

mongoose.model('Ingredient', IngredientSchema);
