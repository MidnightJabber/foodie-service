import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

const ProfileImgType = new GraphQLObjectType({
  name: 'ProfileImgType',
  fields: {
    data: { type: GraphQLString },
    contentType: { type: GraphQLString },
  },
});

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    profileImg: { type: ProfileImgType },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
});

export const UserInputType = new GraphQLInputObjectType({
  name: 'UserInputType',
  fields: {
    email: { type: GraphQLString },
    profileImg: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
});

export default UserType;
