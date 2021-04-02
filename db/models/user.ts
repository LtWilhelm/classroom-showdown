import {Bson} from 'mongo';
import db from '../dbConfig.ts';
import IDBI from './dbItem.ts';

type role = 'student' | 'instructor';
type challengeScore = {
  challengeId: string;
  score: number;
}

interface UserSchema extends IDBI {
  username: string;
  role: role;
  scores: challengeScore[];
}

const users = db.collection<UserSchema>("users");

export default users;