import db from '../dbConfig.ts';
import IDBI from './dbItem.ts'

export interface ChallengeSchema extends IDBI {
  name: string;
  description: string;
  fileUrl: string;
  time: number;
  solution: string;
}

const challenges = db.collection<ChallengeSchema>('challenges');


export default challenges;