import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

import IngredientType from './IngredientType';
import { editIngredient, addNewIngredient } from './IngredientService';

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

export default IngredientMutations;
