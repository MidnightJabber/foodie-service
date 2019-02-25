import { GraphQLID, GraphQLNonNull } from 'graphql';
import { edit as UserServiceEdit } from 'services/user';
import UserType, { UserInputType } from 'schema/types/user';

const edit = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    user: { type: UserInputType },
  },
  resolve(parentValue, { id, user }) {
    return UserServiceEdit(id, user);
  },
};

export default edit;
