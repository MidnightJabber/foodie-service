import { create as FoodServiceCreate } from 'services/food';
import FoodType, { FoodInputType } from 'schema/types/food';

const create = {
  type: FoodType,
  args: {
    food: { type: FoodInputType },
  },
  resolve(parentValue, { food }) {
    return FoodServiceCreate(food);
  },
};

export default create;
