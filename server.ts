import { Drash } from 'drash';
import { UserResource } from './resources/users.ts';
import { ChallengesResource } from './resources/challenges.ts';

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
  response_output: "text/html",
  resources: [HomeResource, UserResource, ChallengesResource],
  static_paths: {
    "/assets": "/client/public",
  }
})

server.run({
  hostname: 'localhost',
  port: 6969
})