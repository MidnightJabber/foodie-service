const hapi = require('hapi');
const mongoose = require('mongoose');
require('dotenv').config(); // Fetching env variables

const {
  MLAB_USERNAME,
  MLAB_PASSWORD,
  MLAB_DS,
  MLAB_PORT,
  MLAB_DB,
} = process.env;

// Connect to MongoDB
mongoose.connect(`mongodb://${MLAB_USERNAME}:${MLAB_PASSWORD}@ds${MLAB_DS}.mlab.com:${MLAB_PORT}/${MLAB_DB}`);
mongoose.connection
  .once('open', () => console.log('Connected to MongoDB'))
  .on('error', () => console.log('Failed to connect to MongoDB'));


// Create sever
const server = hapi.server({
  port: 9080,
  host: 'localhost'
});


// Start server
const init = async () => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => '<h1>Hello World</h1>',
  });

  await server.start();

  console.log(`Server running on ${server.info.uri}`);
}

init();