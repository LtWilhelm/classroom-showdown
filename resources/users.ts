import { Drash } from 'drash';
import { Bson } from 'mongo';

import users from '../db/models/user.ts';
import { cookieName } from '../consts/cookieName.ts';
import { invites } from './invitation.ts'

export class UserResource extends Drash.Http.Resource {
  static paths = ['/api/users/:id', '/api/users'];

  public async GET() {
    this.response.headers.set('content-type', 'application/json');
    this.id = this.request.getPathParam('id');

    if (this.id) await this.getById();
    else await this.getAll();

    return this.response;
  }

  // public async POST() {
  //   const body = (await this.request.getAllBodyParams()).data;
  //   if (body) {
  //     const id = await users.insertOne(body);
  //     this.response.body = id.toString();
  //   }
  //   return this.response;
  // }

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


export class UserSignUpResource extends Drash.Http.Resource {
  static paths = ["/user/:method"]

  public GET() {
    this.response.headers.set('content-type', 'application/json');
    const method = this.request.getPathParam('method');
    if (method === "resume") {
      const user = (this.request as Drash.Http.Request & { user: any }).user;
      user._id = user._id.toString();
      this.response.body = user;
    }
    return this.response;
  }

  public async POST() {
    const method = this.request.getPathParam('method');
    if (method === "signup") {
      const body = this.request.getAllBodyParams().data as any;
      if (body) {
        const invite = await invites.findOne({_id: new Bson.ObjectID(body.inviteCode.substring(3))});
        if (invite && invite.type.substring(0, 3) === body.inviteCode.substring(0, 3)) {
          const id = await users.insertOne({
            username: body.username,
            role: body.inviteCode.substring(0, 3) === 'ins' ? 'instructor' : 'student'
          });
          this.response.setCookie({
            name: cookieName,
            value: id.toString()
          });
        }
      }
    }
    return this.response;
  }
}