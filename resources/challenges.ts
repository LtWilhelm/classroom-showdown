import { Bson } from 'mongo';
import { Drash } from 'drash';
import challenges from '../db/models/challenge.ts';

export class ChallengesResource extends Drash.Http.Resource {
  static paths = ['/api/challenges/:id?', '/api/challenges']

  public async GET() {
    this.response.headers.set('content-type', 'application/json');
    this.id = this.request.getPathParam('id');

    if (this.id) await this.getById();
    else await this.getAll();

    this.response.status_code = 200;
    return this.response;
  }

  public async POST() {
    const body = this.request.getAllBodyParams().data;

    if (body) {
      const inserted = await challenges.insertOne(body);
      const updated = await challenges.findOne({ _id: inserted }, { noCursorTimeout: false } as any);

      this.response.body = updated;
    } else {
      this.response.body = 'FAILED';
      this.response.status_code = 500;
    }
    return this.response;
  }

  public async PUT() {
    const body = this.request.getAllBodyParams().data as { _id: string } & any;
    console.log(body);
    if (body) {
      await challenges.updateOne(
        { _id: new Bson.ObjectID(body._id) },
        {
          $set: {
            name: body.name,
            description: body.description,
            fileUrl: body.fileUrl,
            solution: body.solution,
            time: body.time
          }
        }
      );
      const updated = await challenges.findOne({ _id: new Bson.ObjectID(body._id) }, { noCursorTimeout: false } as any);

      this.response.body = updated;
    } else {
      this.response.body = 'FAILED';
      this.response.status_code = 500;
    }
    return this.response;

  }

  private id?: string | null;

  private async getById() {
    const challenge = await challenges.findOne({ _id: new Bson.ObjectID(this.id) }, { noCursorTimeout: false } as any);

    this.response.body = challenge;
  }

  private async getAll() {
    const c = await challenges.find({}, { noCursorTimeout: false } as any).map(({ name, _id }: any) => ({ name, _id }));
    this.response.body = c;
  }

}
