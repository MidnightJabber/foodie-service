const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');

const IngredientType = require('./graphql/IngredientType');
const IngredientModel = require('./models/Ingredient');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ingredient: {
      type: IngredientType,
      args: { id: { type: GraphQLString } },
      resolve: (parent, { id }) => IngredientModel.findById(id),
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
});