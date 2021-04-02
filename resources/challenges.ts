import {Bson} from 'mongo';
import {Drash} from 'drash';
import challenges from '../db/models/challenge.ts';

export class ChallengesResource extends Drash.Http.Resource {
  static paths = ['/api/challenges/:id?']

  public async GET() {
    this.response.headers.set('content-type', 'application/json');
    this.id = this.request.getPathParam('id');
    
    if (this.id) await this.getById();
    else await this.getAll();

    return this.response;
  }

  public async POST() {
    const body = this.request.getAllBodyParams().data;

    if (body) {
      const inserted = await challenges.insertOne(body);
      this.response.body = inserted.toString();
    } else {
      this.response.body = 'FAILED';
      this.response.status_code = 500;
    }
    return this.response;
  }

  private id?: string | null;

  private async getById() {
    const challenge = await challenges.findOne({_id: new Bson.ObjectID(this.id)});

    this.response.body = challenge;
  }

  private async getAll() {
    const c = await challenges.find({}).map(({name, _id}) => ({name, _id}));
    this.response.body = c;
  }

}
