import mongoose from 'mongoose';

const Ingredient = mongoose.model('ingredient');

/**
 * Creates a new ingredient.
 * @param  {Object} props          [Properties of an ingredient]
 * @return {Promise<Ingredient>}   [New ingredient]
 */
function create(props) {
  const ingredient = new Ingredient(props);
  return ingredient.save();
}

/**
 * Updates an existing ingredient.
 * @param  {ObjectId} id            [Id of the ingedient]
 * @param  {Object} payload         [Map including the properties to update]
 * @return {Promise<Ingredient>}    [Updated ingredient]
 */
function edit(id, payload) {
  return Ingredient.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
}

/**
 * Deletes an existing ingredient.
 * @param  {ObjectId} id            [Id of the ingedient]
 * @return {Promise<Ingredient>}    [Updated ingredient]
 */
function deleteById(id) {
  return Ingredient.findByIdAndDelete(id);
}

export { create, edit, deleteById };
