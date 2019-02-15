import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import GraphQLDate from 'graphql-date';

const IngredientType = new GraphQLObjectType({
  name: 'IngredientType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    createDate: { type: GraphQLDate },
    lastUpdated: { type: GraphQLDate },
  },
});

export default IngredientType;
