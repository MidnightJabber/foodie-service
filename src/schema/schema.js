import { GraphQLSchema } from 'graphql';
import mutation from './mutation';
import RootQueryType from './types/rootQuery';

export default new GraphQLSchema({
  query: RootQueryType,
  mutation,
});
