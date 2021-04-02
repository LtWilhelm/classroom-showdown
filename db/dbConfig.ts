import { MongoClient } from "mongo";

const client = new MongoClient();
await client.connect("mongodb://192.168.1.9:27017");

export default client.database('class-scores');