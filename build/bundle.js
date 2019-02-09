/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var UserType = new _graphql.GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    email: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    firstName: { type: _graphql.GraphQLString },
    lastName: { type: _graphql.GraphQLString }
  }
});

exports.default = UserType;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.signup = undefined;

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = __webpack_require__(4);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _mongoose2.default.model('user');

// SerializeUser is used to provide some identifying token that can be saved
// in the users session.  We traditionally use the 'ID' for this.
_passport2.default.serializeUser(function (user, done) {
  done(null, user.id);
});

// The counterpart of 'serializeUser'.  Given only a user's ID, we must return
// the user object.  This object is placed on 'req.user'.
_passport2.default.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
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
_passport2.default.use(new _passportLocal.Strategy({ usernameField: 'email' }, function (email, password, done) {
  User.findOne({ email: email.toLowerCase() }, function (findOneErr, user) {
    if (findOneErr) {
      return done(findOneErr);
    }

    if (!user) {
      return done(null, false, 'Invalid Credentials');
    }

    user.comparePassword(password, function (comparePassErr, isMatch) {
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
function signup(_ref) {
  var email = _ref.email,
      password = _ref.password,
      req = _ref.req;

  var user = new User({ email: email, password: password });

  if (!email || !password) {
    throw new Error('You must provide an email and password.');
  }

  return User.findOne({ email: email }).then().then(function (existingUser) {
    if (existingUser) {
      throw new Error('Email in use');
    }
    return user.save();
  }).then(function (savedUser) {
    return new Promise(function (resolve, reject) {
      req.logIn(user, function (err) {
        if (err) {
          reject(err);
        }
        resolve(savedUser);
      });
    });
  });
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
function login(_ref2) {
  var email = _ref2.email,
      password = _ref2.password,
      req = _ref2.req;

  return new Promise(function (resolve, reject) {
    _passport2.default.authenticate('local', function (err, user) {
      if (!user) {
        reject(new Error('Invalid credentials.'));
      }

      req.login(user, function () {
        return resolve(user);
      });
    })({ body: { email: email, password: password } });
  });
}

function logout(_ref3) {
  var req = _ref3.req;
  var user = req.user;

  req.logout();

  return user;
}

exports.signup = signup;
exports.login = login;
exports.logout = logout;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _server = __webpack_require__(7);

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_server2.default.listen(process.env.PORT, function () {
  console.log('Listening to PORT', process.env.PORT);
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(8);

var _cors = __webpack_require__(9);

var _cors2 = _interopRequireDefault(_cors);

var _connectMongo = __webpack_require__(10);

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _express = __webpack_require__(11);

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = __webpack_require__(12);

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = __webpack_require__(13);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = __webpack_require__(4);

var _passport2 = _interopRequireDefault(_passport);

__webpack_require__(14);

var _schema = __webpack_require__(17);

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);
var _process$env = process.env,
    MONGO_USER = _process$env.MONGO_USER,
    MONGO_PASSWORD = _process$env.MONGO_PASSWORD,
    MONGO_URL = _process$env.MONGO_URL,
    MONGO_DB_NAME = _process$env.MONGO_DB_NAME;

var MongoUserCredentials = MONGO_USER + ':' + encodeURIComponent(MONGO_PASSWORD);
var MONGO_CONNECTION_URI = 'mongodb://' + MongoUserCredentials + '@' + MONGO_URL + '/' + MONGO_DB_NAME;
var whitelist = [process.env.LOCAL_CLIENT_DOMAIN, process.env.CLIENT_DOMAIN];

console.log(MONGO_CONNECTION_URI);

// enable cors
var corsOptions = {
  origin: function origin(_origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(_origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true // <= required backend setting
};

_mongoose2.default.Promise = global.Promise;

_mongoose2.default.connect(MONGO_CONNECTION_URI);
_mongoose2.default.connection.once('open', function () {
  return console.log('Connected to MLab instance.');
}).on('error', function (error) {
  return console.log('Error connecting to MLab: ', error);
});

app.use((0, _cors2.default)(corsOptions));

app.use((0, _expressSession2.default)({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: MONGO_CONNECTION_URI,
    autoReconnect: true
  })
}));

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.use('/graphql', (0, _expressGraphql2.default)({
  schema: _schema2.default,
  graphiql: true
}));

exports.default = app;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("dotenv/config");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(15);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bcryptNodejs = __webpack_require__(16);

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: [true, 'email is a required field.'] },
  password: { type: String, required: [true, 'password is a required field.'] }
});

UserSchema.pre('save', function save(next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  _bcryptNodejs2.default.genSalt(10, function (genSaltErr, salt) {
    if (genSaltErr) {
      return next(genSaltErr);
    }

    _bcryptNodejs2.default.hash(user.password, salt, null, function (hashErr, hash) {
      if (hashErr) {
        return next(hashErr);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  _bcryptNodejs2.default.compare(candidatePassword, this.password, function (err, isMatch) {
    cb(err, isMatch);
  });
};

_mongoose2.default.model('user', UserSchema);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _mutation = __webpack_require__(18);

var _mutation2 = _interopRequireDefault(_mutation);

var _rootQuery = __webpack_require__(23);

var _rootQuery2 = _interopRequireDefault(_rootQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLSchema({
  query: _rootQuery2.default,
  mutation: _mutation2.default
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _login = __webpack_require__(19);

var _login2 = _interopRequireDefault(_login);

var _signup = __webpack_require__(21);

var _signup2 = _interopRequireDefault(_signup);

var _logout = __webpack_require__(22);

var _logout2 = _interopRequireDefault(_logout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: function fields() {
    return {
      login: _login2.default,
      signup: _signup2.default,
      logout: _logout2.default
    };
  }
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _auth = __webpack_require__(3);

var _user = __webpack_require__(1);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = {
  type: _user2.default,
  args: {
    email: { type: _graphql.GraphQLString },
    password: { type: _graphql.GraphQLString }
  },
  resolve: function resolve(parentValue, _ref, req) {
    var email = _ref.email,
        password = _ref.password;

    return (0, _auth.login)({ email: email, password: password, req: req });
  }
};

exports.default = login;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _auth = __webpack_require__(3);

var _user = __webpack_require__(1);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signup = {
  type: _user2.default,
  args: {
    email: { type: _graphql.GraphQLString },
    password: { type: _graphql.GraphQLString }
  },
  resolve: function resolve(parentValue, _ref, req) {
    var email = _ref.email,
        password = _ref.password;

    return (0, _auth.signup)({ email: email, password: password, req: req });
  }
};

exports.default = signup;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = __webpack_require__(1);

var _user2 = _interopRequireDefault(_user);

var _auth = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logout = {
  type: _user2.default,
  resolve: function resolve(parentValue, args, req) {
    return (0, _auth.logout)({ req: req });
  }
};

exports.default = logout;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _user = __webpack_require__(1);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RootQueryType = new _graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: _user2.default,
      resolve: function resolve(parentValue, args, req) {
        return req.user;
      }
    }
  }
});

exports.default = RootQueryType;

/***/ })
/******/ ]);