const hapi = require('hapi');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const mongoose = require('mongoose');

require('dotenv').config(); // Fetching env variables

require('./models'); // Registering models
const schema = require('./graphql/schema'); // Importing schema

const FALLBACK_PORT = 9080;

const {
  MLAB_USERNAME,
  MLAB_PASSWORD,
  MLAB_DS,
  MLAB_PORT,
  MLAB_DB,
  PORT,
  HOST,
} = process.env;

// Connect to MongoDB
mongoose.connect(`mongodb://${MLAB_USERNAME}:${MLAB_PASSWORD}@ds${MLAB_DS}.mlab.com:${MLAB_PORT}/${MLAB_DB}`);
mongoose.connection
  .once('open', () => console.log('Connected to MongoDB'))
  .on('error', () => console.log('Failed to connect to MongoDB'));


// Create sever
const server = hapi.server({
  port: PORT || FALLBACK_PORT,
  host: HOST,
});


// Start server
const initServer = async () => {
  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql',
      },
      route: {
        cors: true,
      },
    },
  });

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema
      },
      route: {
        cors: true,
      },
    },
  });

  await server.start();

  console.log(`Server running on ${server.info.uri}`);
}

module.exports = initServer;
