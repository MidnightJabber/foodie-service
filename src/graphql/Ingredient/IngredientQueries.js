const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const IngredientType = require('./IngredientType');
const { getIngredientByID } = require('./IngredientService');

const IngredientQueries = {
  ingredient: {
    type: IngredientType,
    args: { id: { type: GraphQLString } },
    resolve: getIngredientByID,
  },
};

module.exports = IngredientQueries;