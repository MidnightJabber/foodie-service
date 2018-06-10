const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const IngredientType = new GraphQLObjectType({
  name: 'Ingredient',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    link: { type: GraphQLString },
  })
});

module.exports = IngredientType;
