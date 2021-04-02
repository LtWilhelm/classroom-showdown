export class Challenge {
  _id: string;
  name: string;
  description: string;
  fileUrl: string;
  
  constructor(c?: Challenge) {
    this._id = c?._id || '';
    this.name = c?.name || '';
    this.description = c?.description || '';
    this.fileUrl = c?.fileUrl || '';
  }
}