const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');

const RootQueryType = require('./RootQuery');
const mutation = require('./mutations');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation
});