import { MongoClient } from "mongo";
import "https://deno.land/x/dotenv/load.ts";

const client = new MongoClient();
// console.log(Deno.env.get('MONGODB_URI'));

// const uri = Deno.env.get('MONGODB_URI');

await client.connect({
  db: 'class-scores',
  tls: true,
  servers: [
    {
      host: Deno.env.get('MONGO_HOST')!,
      port: 27017
    }
  ],
  credential: {
    db: 'class-scores',
    username: Deno.env.get('MONGO_USER'),
    password: Deno.env.get('MONGO_PWD'),
    mechanism: 'SCRAM-SHA-1'
  }
});

export default client.database('class-scores');