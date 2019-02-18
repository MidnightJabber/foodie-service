import mongoose from 'mongoose';

const Food = mongoose.model('food');

/**
 * Creates a new food.
 * @param  {Object} props          [Properties of a food]
 * @return {Promise<Food>}   [New food]
 */
function create(props) {
  const food = new Food(props);
  return food.save();
}

/**
 * Updates an existing food.
 * @param  {ObjectId} id            [Id of the food]
 * @param  {Object} payload         [Map including the properties to update]
 * @return {Promise<Food>}          [Updated food]
 */
function edit(id, payload) {
  return Food.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
}

/**
 * Deletes an existing food.
 * @param  {ObjectId} id            [Id of the food]
 * @return {Promise<Food>}          [Updated food]
 */
function deleteById(id) {
  return Food.findByIdAndDelete(id);
}

function getFoods() {
  return Food.find({});
}

export { create, edit, deleteById, getFoods };
