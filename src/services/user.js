import mongoose from 'mongoose';
import fs from 'fs';

const User = mongoose.model('user');


/**
 * Updates an existing user.
 * @param  {ObjectId} id            [Id of the user]
 * @param  {Object} payload         [Map including the properties to update]
 * @return {Promise<User>}          [Updated user]
 */
function edit(id, payload) {
  const { profileImg } = payload;
  const updatePayload = payload;

  if (profileImg) {
    updatePayload.profileImg = {};
    updatePayload.profileImg.data = fs.readFileSync(profileImg);
    updatePayload.profileImg.data = Buffer.from(updatePayload.profileImg.data).toString('base64');
    updatePayload.profileImg.contentType = 'image/png';
  }
  return User.findOneAndUpdate(
    { _id: id },
    updatePayload,
    { new: true },
  );
}

/**
 * Get an existing user.
 * @param  {ObjectId} id            [Id of the user]
 * @return {Promise<User>}          [User requested]
 */
function getById(id) {
  return User.findById.findByIdAndDelete(id);
}

export { edit, getById };
