import mongoose from 'mongoose';

const BodyStat = mongoose.model('bodyStat');

/**
 * Creates a new body stat.
 * @param  {Object} props          [Properties of a body stat]
 * @return {Promise<BodyStat>}     [New body stat]
 */
function create(props) {
  const bodyStat = new BodyStat(props);

  if (!bodyStat.associatedUser) {
    // TODO: Check that the associated user id provided is valid by cross-referencing from the DB?
    throw new Error('Body stat needs to be associated with a valid user id during creation.');
  }

  return bodyStat.save();
}

/**
 * Updates an existing body stat.
 * @param  {ObjectId} id            [Id of the body stat]
 * @param  {Object} payload         [Map including the properties to update]
 * @return {Promise<BodyStat>}          [Updated body stat]
 */
function edit(id, payload) {
  return BodyStat.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
}

/**
 * Deletes an existing body stat.
 * @param  {ObjectId} id            [Id of the body stat]
 * @return {Promise<BodyStat>}          [Updated body stat]
 */
function deleteById(id) {
  return BodyStat.findByIdAndDelete(id);
}

export { create, edit, deleteById };
