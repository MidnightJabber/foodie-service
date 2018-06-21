import { GraphQLObjectType } from 'graphql';
import Ingredient from 'graph/Ingredient';

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    ...Ingredient.IngredientMutations,
  },
});

export default mutation;
