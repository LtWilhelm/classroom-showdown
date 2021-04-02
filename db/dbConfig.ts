import { MongoClient } from "mongo";
import "https://deno.land/x/dotenv/load.ts";

const client = new MongoClient();
console.log(Deno.env.get('MONGODB_URI'));
await client.connect(Deno.env.get('MONGODB_URI')!);

export default client.database('class-scores');