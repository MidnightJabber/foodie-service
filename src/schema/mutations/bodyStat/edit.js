import { GraphQLID, GraphQLNonNull } from 'graphql';
import { edit as BodyStatServiceEdit } from 'services/bodyStat';
import BodyStatType, { BodyStatEditInputType } from 'schema/types/bodyStat';

const edit = {
  type: BodyStatType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    bodyStat: { type: BodyStatEditInputType },
  },
  resolve(parentValue, { id, bodyStat }) {
    return BodyStatServiceEdit(id, bodyStat);
  },
};

export default edit;
