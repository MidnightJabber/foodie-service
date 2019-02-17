
import { GraphQLObjectType, GraphQLList } from 'graphql';
import { getFoods } from 'services/food';
import UserType from './user';
import FoodType from './food';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
    ingredients: {
      type: new GraphQLList(FoodType),
      resolve() {
        return getFoods();
      },
    },
  },
});

export default RootQueryType;
