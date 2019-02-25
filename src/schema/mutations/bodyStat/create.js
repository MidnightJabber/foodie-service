import { create as BodyStatServiceCreate } from 'services/bodyStat';
import BodyStatType, { BodyStatCreateInputType } from 'schema/types/bodyStat';

const create = {
  type: BodyStatType,
  args: {
    bodyStat: { type: BodyStatCreateInputType },
  },
  resolve(parentValue, { bodyStat }) {
    return BodyStatServiceCreate(bodyStat);
  },
};

export default create;
