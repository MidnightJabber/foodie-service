import { GraphQLObjectType } from 'graphql';
import Ingredient from 'graph/Ingredient';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...Ingredient.IngredientQueries,
  },
});

export default RootQueryType;
