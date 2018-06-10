const { GraphQLObjectType } = require('graphql');
const IngredientMutations = require('../Ingredient/IngredientMutations');

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    ...IngredientMutations,
  },
});

module.exports = mutation;