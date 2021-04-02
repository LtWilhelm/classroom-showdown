import { Drash } from 'drash';
import { UserResource, UserSignUpResource } from './resources/users.ts';
import { ChallengesResource } from './resources/challenges.ts';
import { AuthMiddleware } from './middleware/auth.ts';
import {InvitationResource} from './resources/invitation.ts';

import { parse } from 'https://deno.land/std/flags/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';


const { args } = Deno;
const DEFAULT_PORT = 6969;
const portArg = parse(args).port;
const { ENVIRONMENT } = config();
class HomeResource extends Drash.Http.Resource {
  static paths = ['/'];
  public GET() {
    const decoder = new TextDecoder('utf-8');
    const idx = Deno.readFileSync(Deno.cwd() + '/client/public/index.html');
    this.response.body = decoder.decode(idx);

    return this.response;
  }
}

const server = new Drash.Http.Server({
  directory: Deno.cwd(),
  middleware: {
    before_request: [
      AuthMiddleware
    ]
  },
  response_output: "text/html",
  resources: [
    HomeResource,
    UserResource,
    UserSignUpResource,
    ChallengesResource,
    InvitationResource
  ],
  static_paths: {
    "/assets": "/client/public",
  }
})

server.run({
  hostname: 'localhost',
  port: portArg ? Number(portArg) : DEFAULT_PORT
}).then(s => {
  console.log('Running on ' + (portArg ? portArg : DEFAULT_PORT));
}).catch(r => console.log(r))