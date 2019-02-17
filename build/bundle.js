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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.signup = undefined;

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = __webpack_require__(4);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(24);

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

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFoods = exports.deleteById = exports.edit = exports.create = undefined;

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Food = _mongoose2.default.model('food');

/**
 * Creates a new food.
 * @param  {Object} props          [Properties of a food]
 * @return {Promise<Food>}   [New food]
 */
function create(props) {
  var food = new Food(props);
  return food.save();
}

/**
 * Updates an existing food.
 * @param  {ObjectId} id            [Id of the food]
 * @param  {Object} payload         [Map including the properties to update]
 * @return {Promise<Food>}          [Updated food]
 */
function edit(id, payload) {
  return Food.findOneAndUpdate({ _id: id }, payload, { new: true });
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

exports.create = create;
exports.edit = edit;
exports.deleteById = deleteById;
exports.getFoods = getFoods;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FoodInputType = undefined;

var _graphql = __webpack_require__(0);

var _graphqlDate = __webpack_require__(28);

var _graphqlDate2 = _interopRequireDefault(_graphqlDate);

var _measurement = __webpack_require__(29);

var _measurement2 = _interopRequireDefault(_measurement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var zeroIfNull = function zeroIfNull(v) {
  return v != null ? v : { value: 0, unit: null };
};

var CarbohydrateType = new _graphql.GraphQLObjectType({
  name: 'CarbohydrateType',
  fields: {
    sugar: {
      type: _measurement2.default,
      description: 'Sugars are the smallest type of carbohydrate and include single sugars and those with two sugar molecules joined together.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.sugar);
      }
    },
    dietaryFiber: {
      type: _measurement2.default,
      description: 'Dietary fiber is made up of many sugar molecules linked together. But unlike starches, fiber is bound together in such a way that it cannot be readily digested. There are two types of dietary fiber: soluble and insoluble.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.dietaryFiber);
      }
    },
    starch: {
      type: _measurement2.default,
      description: 'Starches are made up of many of glucose molecules linked together into long chains.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.startch);
      }
    },
    sugarAlcohols: {
      type: _measurement2.default,
      description: 'Sugar alcohols are carbohydrates that chemically have characteristics of both sugars and alcohols.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.sugarAlcohols);
      }
    },
    total: {
      type: _measurement2.default,
      description: 'Carbohydrate is one of three macronutrients in food that provide calories, or “energy,” for the body. Each gram of carbohydrate provides 4 calories.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.total);
      }
    }
  }
});

var VitaminType = new _graphql.GraphQLObjectType({
  name: 'VitaminType',
  fields: {
    A: {
      type: _measurement2.default,
      description: 'Vitamin A is important for vision. It helps the retina of the eye to function properly, particularly at night.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.A);
      }
    },
    B: {
      type: _measurement2.default,
      description: 'Thiamine (B/B1) was the first to be discovered. It is essential for heart health and for the brain and nervous system to function properly.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.B);
      }
    },
    B6: {
      type: _measurement2.default,
      description: 'B6 helps the body to convert fat and carbohydrates into energy, and it contributes to healthy skin, hair and eyes. Vitamin B6 is also involved in brain development of the fetus during pregnancy and infancy, and it helps the immune system to function well. It is sometimes used as a treatment for morning sickness.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.B6);
      }
    },
    B12: {
      type: _measurement2.default,
      description: 'Vitamin B-12 is a crucial B vitamin. It is needed for nerve tissue health, brain function, and the production of red blood cells. Cobalamin is another name for vitamin B-12.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.B12);
      }
    },
    C: {
      type: _measurement2.default,
      description: 'Practically a celebrity in the world of vitamins, almost everybody reaches for a vitamin C pill at the first sign of a cold. Besides increasing the production of disease-fighting white blood cells and antibodies, thereby boosting the immune system, vitamin C is helpful in maintaining good eyesight.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.C);
      }
    },
    D: {
      type: _measurement2.default,
      description: 'The sunshine vitamin plays a key role in bone health. Low levels of vitamin D are linked with a growing list of health problems, including multiple sclerosis, osteoporosis, osteoarthritis, rickets, heart disease, diabetes, depression and several kinds of cancers.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.D);
      }
    }
  }
});

var NutritionType = new _graphql.GraphQLObjectType({
  name: 'NutritionType',
  fields: {
    protein: {
      type: _measurement2.default,
      description: 'Protein is a macronutrient that is essential to building muscle mass.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.protein);
      }
    },
    fat: {
      type: _measurement2.default,
      description: 'Fat, one of the three macro-nutrients, are an essential part of our diet and is important for good health.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.fat);
      }
    },
    carbohydrate: {
      type: CarbohydrateType,
      description: 'Carbohydrate is one of three macronutrients in food that provide calories, or “energy,” for the body. Each gram of carbohydrate provides 4 calories.'
    },
    cholestrol: {
      type: _measurement2.default,
      description: 'Cholesterol is a waxy, fat-like substance that\'s found in all the cells in your body. Your body needs some cholesterol to make hormones, vitamin D, and substances that help you digest foods. Our body makes all the cholesterol it needs.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.cholestrol);
      }
    },
    sodium: {
      type: _measurement2.default,
      description: 'Sodium is a mineral that occurs naturally in foods or is added during manufacturing - or both.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.sodium);
      }
    },
    potassium: {
      type: _measurement2.default,
      desdcription: 'Potassium is a mineral that, among other things, helps muscles contract, helps regulate fluids and mineral balance in and out of body cells, and helps maintain normal blood pressure by blunting the effect of sodium.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.potassium);
      }
    },
    vitamin: {
      type: VitaminType,
      description: 'Vitamins are organic compounds that are needed in small quantities to sustain life.'
    },
    calcium: {
      type: _measurement2.default,
      desdcription: 'Calcium is a mineral that is necessary for life. In addition to building bones and keeping them healthy, calcium enables our blood to clot, our muscles to contract, and our heart to beat.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.calcium);
      }
    },
    iron: {
      type: _measurement2.default,
      description: 'Iron is a mineral, and its main purpose is to carry oxygen in the hemoglobin of red blood cells throughout the body so cells can produce energy.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.iron);
      }
    },
    magnesium: {
      type: _measurement2.default,
      description: 'Magnesium is a mineral that\'s crucial to the body\'s function. Magnesium helps keep blood pressure normal, bones strong, and the heart rhythm steady.',
      resolve: function resolve(obj) {
        return zeroIfNull(obj.magnesium);
      }
    }
  }
});

var FoodType = new _graphql.GraphQLObjectType({
  name: 'FoodType',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      description: 'Unique identifier for the food.'
    },
    name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    createDate: { type: _graphqlDate2.default },
    lastUpdated: { type: _graphqlDate2.default },
    version: { type: _graphql.GraphQLInt },
    nutrition: { type: NutritionType },
    servingSize: { type: _measurement2.default },
    calories: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(obj) {
        return zeroIfNull(obj.calories);
      }
    }
  }
});

var CarbohydrateInputType = new _graphql.GraphQLInputObjectType({
  name: 'CarbohydrateInputType',
  fields: {
    sugar: { type: _measurement.MeasurementInputType },
    dietaryFiber: { type: _measurement.MeasurementInputType },
    starch: { type: _measurement.MeasurementInputType },
    sugarAlcohols: { type: _measurement.MeasurementInputType },
    total: { type: _measurement.MeasurementInputType }
  }
});

var VitaminInputType = new _graphql.GraphQLInputObjectType({
  name: 'VitaminInputType',
  fields: {
    A: { type: _measurement.MeasurementInputType },
    B: { type: _measurement.MeasurementInputType },
    B6: { type: _measurement.MeasurementInputType },
    B12: { type: _measurement.MeasurementInputType },
    C: { type: _measurement.MeasurementInputType },
    D: { type: _measurement.MeasurementInputType }
  }
});

var NutritionInputType = new _graphql.GraphQLInputObjectType({
  name: 'NutritionInputType',
  fields: {
    protein: { type: _measurement.MeasurementInputType },
    fat: { type: _measurement.MeasurementInputType },
    carbohydrate: { type: CarbohydrateInputType },
    cholestrol: { type: _measurement.MeasurementInputType },
    sodium: { type: _measurement.MeasurementInputType },
    potassium: { type: _measurement.MeasurementInputType },
    vitamin: { type: VitaminInputType },
    calcium: { type: _measurement.MeasurementInputType },
    iron: { type: _measurement.MeasurementInputType },
    magnesium: { type: _measurement.MeasurementInputType },
    cobalamin: { type: _measurement.MeasurementInputType }
  }
});

var FoodInputType = exports.FoodInputType = new _graphql.GraphQLInputObjectType({
  name: 'FoodInputType',
  fields: {
    name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    servingSize: { type: _measurement.MeasurementInputType },
    calories: { type: _graphql.GraphQLFloat },
    nutrition: { type: NutritionInputType }
  }
});

exports.default = FoodType;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _server = __webpack_require__(9);

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_server2.default.listen(process.env.PORT, function () {
  console.log('Listening to PORT', process.env.PORT);
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(10);

var _cors = __webpack_require__(11);

var _cors2 = _interopRequireDefault(_cors);

var _connectMongo = __webpack_require__(12);

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _express = __webpack_require__(13);

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = __webpack_require__(14);

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = __webpack_require__(15);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = __webpack_require__(4);

var _passport2 = _interopRequireDefault(_passport);

__webpack_require__(16);

var _schema = __webpack_require__(21);

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
/* 10 */
/***/ (function(module, exports) {

module.exports = require("dotenv/config");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(17);

__webpack_require__(19);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bcryptNodejs = __webpack_require__(18);

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _mongoose = __webpack_require__(1);

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
/* 18 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _measurement = __webpack_require__(20);

var _measurement2 = _interopRequireDefault(_measurement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var FoodSchema = new Schema({
  name: String,
  createDate: Date,
  lastUpdated: Date,
  servingSize: _measurement2.default,
  calories: Number,
  nutrition: {
    protein: {},
    fat: _measurement2.default,
    carbohydrate: {
      sugar: _measurement2.default,
      dietaryFiber: _measurement2.default,
      starch: _measurement2.default,
      sugarAlcohols: _measurement2.default,
      total: _measurement2.default
    },
    cholesterol: _measurement2.default,
    sodium: _measurement2.default,
    potassium: _measurement2.default,
    vitamin: {
      A: _measurement2.default,
      B: _measurement2.default,
      B6: _measurement2.default,
      C: _measurement2.default,
      D: _measurement2.default
    },
    calcium: _measurement2.default,
    iron: _measurement2.default,
    magnesium: _measurement2.default,
    cobalamin: _measurement2.default
  }
}, {
  timestamps: {
    createdAt: 'createDate',
    updatedAt: 'lastUpdated'
  },
  versionKey: 'version'
});

_mongoose2.default.model('food', FoodSchema);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Measurement = {
  value: Number,
  unit: Number
};

exports.default = Measurement;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _mutation = __webpack_require__(22);

var _mutation2 = _interopRequireDefault(_mutation);

var _rootQuery = __webpack_require__(31);

var _rootQuery2 = _interopRequireDefault(_rootQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLSchema({
  query: _rootQuery2.default,
  mutation: _mutation2.default
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _login = __webpack_require__(23);

var _login2 = _interopRequireDefault(_login);

var _signup = __webpack_require__(25);

var _signup2 = _interopRequireDefault(_signup);

var _logout = __webpack_require__(26);

var _logout2 = _interopRequireDefault(_logout);

var _create = __webpack_require__(27);

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: function fields() {
    return {
      login: _login2.default,
      signup: _signup2.default,
      logout: _logout2.default,
      createFood: _create2.default
    };
  }
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _auth = __webpack_require__(3);

var _user = __webpack_require__(2);

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
/* 24 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _auth = __webpack_require__(3);

var _user = __webpack_require__(2);

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = __webpack_require__(2);

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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _food = __webpack_require__(5);

var _food2 = __webpack_require__(6);

var _food3 = _interopRequireDefault(_food2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = {
  type: _food3.default,
  args: {
    food: { type: _food2.FoodInputType }
  },
  resolve: function resolve(parentValue, _ref) {
    var food = _ref.food;

    return (0, _food.create)(food);
  }
};

exports.default = create;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("graphql-date");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeasurementInputType = undefined;

var _graphql = __webpack_require__(0);

var _unit = __webpack_require__(30);

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MeasurementInputType = exports.MeasurementInputType = new _graphql.GraphQLInputObjectType({
  name: 'MeasurementInputType',
  fields: {
    value: { type: _graphql.GraphQLFloat },
    unit: { type: new _graphql.GraphQLEnumType(_unit.UnitInputType) }
  }
});

var MeasurementType = new _graphql.GraphQLObjectType({
  name: 'MeasurementType',
  fields: {
    value: {
      type: _graphql.GraphQLFloat,
      description: 'Value of the measurement. '
    },
    unit: {
      type: new _graphql.GraphQLEnumType(_unit2.default),
      description: 'Unit of the measurement.'
    }
  }
});

exports.default = MeasurementType;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var UnitInputType = exports.UnitInputType = {
  name: 'UnitInputType',
  values: {
    Gram: { value: 0 },
    MilliGram: { value: 1 },
    Percentage: { value: 2 }
  }
};

var UnitType = {
  name: 'UnitType',
  values: {
    Gram: { value: 0 },
    MilliGram: { value: 1 },
    Percentage: { value: 2 }
  }
};

exports.default = UnitType;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _food = __webpack_require__(5);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

var _food2 = __webpack_require__(6);

var _food3 = _interopRequireDefault(_food2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RootQueryType = new _graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: _user2.default,
      resolve: function resolve(parentValue, args, req) {
        return req.user;
      }
    },
    ingredients: {
      type: new _graphql.GraphQLList(_food3.default),
      resolve: function resolve() {
        return (0, _food.getFoods)();
      }
    }
  }
});

exports.default = RootQueryType;

/***/ })
/******/ ]);