const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: String,
  link: String,
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
