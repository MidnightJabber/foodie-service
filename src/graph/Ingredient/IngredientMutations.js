const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

const IngredientType = require('./IngredientType');
const { editIngredient, addNewIngredient } = require('./IngredientService');

const IngredientMutations = {
  editIngredient: {
    type: IngredientType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLString },
    },
    resolve: editIngredient,
  },

  addIngredient: {
    type: IngredientType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: addNewIngredient,
  },
};

module.exports = IngredientMutations;
