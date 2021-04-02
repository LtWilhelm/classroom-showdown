import { Drash } from 'drash';
import db from '../db/dbConfig.ts'
import IDBI from '../db/models/dbItem.ts'

type role = 'student' | 'instructor';
interface IInvite extends IDBI {
  type: role
}
export const invites = db.collection<IInvite>("invites");

export class InvitationResource extends Drash.Http.Resource {
  static paths = ['/api/invite'];

  public async GET() {
    this.inviteType = (this.request.getUrlQueryParam('type') || 'student') as role;
    await this.generateInvite();
    return this.response;
  }

  private inviteType: role = 'student';

  private async generateInvite() {
    const id = await invites.insertOne({type: this.inviteType});
    this.response.body = this.inviteType.substring(0,3) + id.toString();

    setTimeout(() => {
      invites.deleteOne({_id: id});
    }, 10*60*1000)
  }
}