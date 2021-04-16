import db from '../dbConfig.ts';
import IDBI from './dbItem.ts'

export interface ChallengeSchema extends IDBI {
  name: string;
  description: string;
  fileUrl: string;
  time: number;
  questions: {
    description: string;
    solution: string;
    score: number;
  }[];
  locked?: boolean;
}

const challenges = db.collection<ChallengeSchema>('challenges');


export default challenges;