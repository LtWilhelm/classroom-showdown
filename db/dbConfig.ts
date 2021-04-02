import { MongoClient } from "mongo";

const client = new MongoClient();
await client.connect(Deno.env.get('MONGODB_URI')!);

export default client.database('class-scores');