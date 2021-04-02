export class User {
  _id: string;
  username: string;
  role: 'student' | 'instructor';
  scores: {
    challengeId: string;
    score: number;
  }[]

  constructor(u?: User) {
    this._id = u?._id || '';
    this.username = u?.username || '';
    this.role = u?.role || 'student';
    this.scores = u?.scores || [];
  }
}