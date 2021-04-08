export class Challenge {
  _id: string;
  name: string;
  description: string;
  fileUrl: string;
  solution: string;
  time: number;
  
  constructor(c?: Challenge) {
    this._id = c?._id || '';
    this.name = c?.name || 'Challenge';
    this.description = c?.description || 'Description';
    this.fileUrl = c?.fileUrl || '';
    this.solution = c?.solution || '';
    this.time = c?.time || 20;
  }
}