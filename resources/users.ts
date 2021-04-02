import { Drash } from 'drash';
import { Bson } from 'mongo';

import users from '../db/models/user.ts';

export class UserResource extends Drash.Http.Resource {
  static paths = ['/api/users/:id', '/api/users'];

  public async GET() {
    this.response.headers.set('content-type', 'application/json');
    this.id = this.request.getPathParam('id');

    if (this.id) await this.getById();
    else await this.getAll();

    return this.response;
  }

  public async POST() {
    const body = (await this.request.getAllBodyParams()).data;
    if (body) {
      const id = await users.insertOne(body);
      this.response.body = id.toString();
    }
    return this.response;
  }

  private id?: string | null;

  private async getAll() {
    const u = await users.find({}).toArray();
    this.response.body = u;
  }

  private async getById() {
    const u = await users.findOne({ _id: new Bson.ObjectId(this.id) });
    this.response.body = u;
  }
}