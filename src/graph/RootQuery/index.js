const { GraphQLObjectType } = require('graphql');
const { IngredientQueries } = require('../Ingredient');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...IngredientQueries,
  },
});

module.exports = RootQueryType;
