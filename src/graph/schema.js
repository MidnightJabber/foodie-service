import { GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql';

import RootQueryType from 'graph/RootQuery';
import mutation from 'graph/mutations';

export default new GraphQLSchema({
  query: RootQueryType,
  mutation
});
