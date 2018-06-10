const mongoose = require('mongoose');
const IngredientModel = mongoose.model('Ingredient');

const getIngredientByID = (parent, { id }) => IngredientModel.findById(id);

const editIngredient = (parent, { id, name }) => IngredientModel.findByIdAndUpdate(id, { name }, { new: true });

const addNewIngredient = (parent, { name, link }) => {
  const newIngredient = new IngredientModel({ name, link });

  return newIngredient.save();
};

module.exports = { getIngredientByID, editIngredient, addNewIngredient };
