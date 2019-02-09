import { GraphQLObjectType } from 'graphql';
import login from './mutations/login';
import signup from './mutations/signup';
import logout from './mutations/logout';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    login,
    signup,
    logout,
  }),
});
