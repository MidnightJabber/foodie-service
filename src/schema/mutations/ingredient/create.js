import { GraphQLString } from 'graphql';

import { login as AuthServiceLogin } from 'services/auth';
import UserType from '../types/user';

const create = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parentValue, { email, password }, req) {
    return AuthServiceLogin({ email, password, req });
  },
};

export default create;
