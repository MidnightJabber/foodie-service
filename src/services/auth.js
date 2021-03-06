import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const User = mongoose.model('user');

// SerializeUser is used to provide some identifying token that can be saved
// in the users session.  We traditionally use the 'ID' for this.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// The counterpart of 'serializeUser'.  Given only a user's ID, we must return
// the user object.  This object is placed on 'req.user'.
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Instructs Passport how to authenticate a user using a locally saved email
// and password combination.  This strategy is called whenever a user attempts to
// log in. We first find the user model in DB that matches the submitted email,
// then check to see if the provided password matches the saved password. There
// are two obvious failure points here: the email might not exist in our DB or
// the password might not match the saved one. In either case, we call the 'done'
// callback, including a string that messages why the authentication process failed.
// This string is provided back to the GraphQL client.
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (findOneErr, user) => {
    if (findOneErr) {
      return done(findOneErr);
    }

    if (!user) {
      return done(null, false, 'Invalid Credentials');
    }

    user.comparePassword(password, (comparePassErr, isMatch) => {
      if (comparePassErr) {
        return done(comparePassErr);
      }

      if (isMatch) {
        return done(null, user);
      }

      return done(null, false, 'Invalid credentials.');
    });
  });
}));


/**
 * Creates a new user account.  We first check to see if a user already exists
 * with this email address to avoid making multiple accounts with identical addresses
 * If it does not, we save the existing user.  After the user is created, it is
 * provided to the 'req.logIn' function.  This is apart of Passport JS.
 * Notice the Promise created in the second 'then' statement.  This is done
 * because Passport only supports callbacks, while GraphQL only supports promises
 * for async code.
 * @param  {String} email    [Email of the user]
 * @param  {String} password [Password of the user]
 * @param  {Object} req      [Request object]
 * @return {Promise<User>}   [New user]
 */
function signup({ email, password, req }) {
  const user = new User({ email, password });

  if (!email || !password) {
    throw new Error('You must provide an email and password.');
  }

  return User.findOne({ email }).then()
    .then(existingUser => {
      if (existingUser) {
        throw new Error('Email in use');
      }
      return user.save();
    })
    .then(savedUser => (
      new Promise((resolve, reject) => {
        req.logIn(user, err => {
          if (err) {
            reject(err);
          }
          resolve(savedUser);
        });
      })
    ));
}


/**
 * logs in a user.  this will invoke the 'local-strategy' defined above in this
 * file. notice the strange method signature here: the 'passport.authenticate'
 * function returns a function, as its indended to be used as a middleware with
 * express.  we have another compatibility layer here to make it work nicely with
 * graphql, as graphql always expects to see a promise for handling async code.
 * @param  {String} email    [Email of the user]
 * @param  {String} password [Password of the user]
 * @param  {Object} req      [Request object]
 * @return {Promise}
 */
function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) {
        reject(new Error('Invalid credentials.'));
      }

      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
}

function logout({ req }) {
  const { user } = req;
  req.logout();

  return user;
}

export { signup, login, logout };
