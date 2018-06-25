import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

const IngredientType = new GraphQLObjectType({
  name: 'Ingredient',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  })
});

export default IngredientType;
