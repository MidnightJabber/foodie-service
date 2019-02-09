import { GraphQLString } from 'graphql';

import { signup as AuthServiceSignup } from 'services/auth';
import UserType from '../types/user';

const signup = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parentValue, { email, password }, req) {
    return AuthServiceSignup({ email, password, req });
  },
};

export default signup;
