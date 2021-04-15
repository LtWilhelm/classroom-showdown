import { MongoClient } from "mongo";
import "https://deno.land/x/dotenv/load.ts";

const client = new MongoClient();

import { parse } from 'https://deno.land/std/flags/mod.ts';
const isDev = parse(Deno.args).dev

console.log(isDev);

// console.log(Deno.env.get('MONGODB_URI'));

// const uri = Deno.env.get('MONGODB_URI');

if (isDev) {
  // await client.connect({
  //   db: 'class-scores',
  //   tls: true,
  //   servers: [
  //     {
  //       host: Deno.env.get('MONGO_HOST')!,
  //       port: 27017
  //     }
  //   ],
  //   credential: {
  //     db: 'class-scores',
  //     username: Deno.env.get('MONGO_USER'),
  //     password: Deno.env.get('MONGO_PWD'),
  //     mechanism: 'SCRAM-SHA-1'
  //   }
  // });
  await client.connect('mongodb://192.168.1.9:27017');
}
else
  await client.connect('mongodb://127.0.0.1:27017');

export default client.database('class-scores');