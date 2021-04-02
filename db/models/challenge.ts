import db from '../dbConfig.ts';
import IDBI from './dbItem.ts'

interface ChallengeSchema extends IDBI {
  name: string;
  description: string;
  jsonUrl: string;
  scriptUrl: string;
}

const challenges = db.collection<ChallengeSchema>('challenges');

export default challenges;