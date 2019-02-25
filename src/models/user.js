import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  profileImg: { data: Buffer, contentType: String },
  email: { type: String, required: [true, 'email is a required field.'] },
  password: { type: String, required: [true, 'password is a required field.'] },
});

UserSchema.pre('save', function save(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (genSaltErr, salt) => {
    if (genSaltErr) {
      return next(genSaltErr);
    }

    bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) {
        return next(hashErr);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

mongoose.model('user', UserSchema);
