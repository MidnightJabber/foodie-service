import 'dotenv/config';
import cors from 'cors';
import connectmongo from 'connect-mongo';
import express from 'express';
import expressGraphQL from 'express-graphql';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';

import './models';
import schema from './schema/schema';

const app = express();
const MongoStore = connectmongo(session);
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_URL,
  MONGO_DB_NAME,
} = process.env;
const MongoUserCredentials = `${MONGO_USER}:${encodeURIComponent(MONGO_PASSWORD)}`;
const MONGO_CONNECTION_URI = `mongodb://${MongoUserCredentials}@${MONGO_URL}/${MONGO_DB_NAME}`;
const whitelist = [
  process.env.LOCAL_CLIENT_DOMAIN,
  process.env.CLIENT_DOMAIN,
];

console.log(MONGO_CONNECTION_URI);

// enable cors
const corsOptions = {
  origin: (origin, callback) => {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true, // <= required backend setting
};

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_CONNECTION_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MLab instance.'))
  .on('error', error => console.log('Error connecting to MLab: ', error));

app.use(cors(corsOptions));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: MONGO_CONNECTION_URI,
    autoReconnect: true,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}));

export default app;
