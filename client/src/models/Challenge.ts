export class Challenge {
  _id: string;
  name: string;
  description: string;
  fileUrl: string;
  time: number;
  questions: Question[];

  constructor(c?: Challenge) {
    this._id = c?._id || '';
    this.name = c?.name || 'Challenge 🖊';
    this.description = c?.description || 'Description 🖊';
    this.fileUrl = c?.fileUrl || '';
    this.time = c?.time || 20;
    this.questions = c?.questions ? c.questions.map(q => new Question(q)) : [new Question()];
  }

  addQuestion = () => {
    this.questions = [...this.questions, new Question()];
    return this;
  }
}

export class Question {
  description: string;
  solution: string;
  score: number;

  constructor(q?: Question) {
    this.solution = q?.solution || '';
    this.description = q?.description || 'Description 🖊';
    this.score = q?.score || 50;
  }
}