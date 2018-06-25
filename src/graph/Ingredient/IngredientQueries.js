import { GraphQLObjectType, GraphQLString } from 'graphql';

import IngredientType from './IngredientType';
import { getIngredientByID } from './IngredientService';

const IngredientQueries = {
  ingredient: {
    type: IngredientType,
    args: { id: { type: GraphQLString } },
    resolve: getIngredientByID,
  },
};

export default IngredientQueries;
