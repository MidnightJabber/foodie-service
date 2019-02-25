import { GraphQLObjectType } from 'graphql';

// Auth
import login from './mutations/login';
import signup from './mutations/signup';
import logout from './mutations/logout';

// Food
import createFood from './mutations/food/create';

// BodyStat
import createBodyStat from './mutations/bodyStat/create';
import editBodyStat from './mutations/bodyStat/edit';

// User
import editUser from './mutations/user/edit';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    login,
    signup,
    logout,
    createFood,
    editUser,
    createBodyStat,
    editBodyStat,
  }),
});
