import { GraphQLObjectType } from 'graphql';
import login from './mutations/login';
import signup from './mutations/signup';
import logout from './mutations/logout';
import createFood from './mutations/food/create';
import editUser from './mutations/user/edit';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    login,
    signup,
    logout,
    createFood,
    editUser,
  }),
});
