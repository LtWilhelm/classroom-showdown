import { Drash } from 'drash';
import { Bson } from 'mongo';
import { cookieName } from '../consts/cookieName.ts';
import users from '../db/models/user.ts';

export async function AuthMiddleware(request: Drash.Http.Request) {
  const cookie = request.getCookie(cookieName);

  if (cookie) {
    const user = await users.findOne({ _id: new Bson.ObjectID(cookie) }, { noCursorTimeout: false } as any);
    if (user) (request as Drash.Http.Request & { user: any }).user = user;
  }
}
