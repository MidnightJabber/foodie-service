import { GraphQLString } from 'graphql';
import { edit as UserServiceEdit } from 'services/user';
import UserType, { UserInputType } from 'schema/types/user';

const edit = {
  type: UserType,
  args: {
    id: { type: GraphQLString },
    user: { type: UserInputType },
  },
  resolve(parentValue, { id, user }) {
    return UserServiceEdit(id, user);
  },
};

export default edit;
