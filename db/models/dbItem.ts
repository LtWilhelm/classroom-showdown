import { Bson } from 'mongo';

interface IDatabaseItem {
  _id: { $oid: string };
}

export default IDatabaseItem;