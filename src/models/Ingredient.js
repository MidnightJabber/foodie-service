const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: String,
  link: String,
});

mongoose.model('Ingredient', IngredientSchema);
