const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const IngredientType = require('./IngredientType');
const { editIngredient, addNewIngredient } = require('./IngredientService');

const IngredientMutations = {
  editIngredient: {
    type: IngredientType,
    args: {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
    },
    resolve: editIngredient,
  },

  addIngredient: {
    type: IngredientType,
    args: {
      name: { type: GraphQLString },
      link: { type: GraphQLString },
    },
    resolve: addNewIngredient,
  }
};

module.exports = IngredientMutations;