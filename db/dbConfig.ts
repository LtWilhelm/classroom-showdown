import { MongoClient } from "mongo";

const client = new MongoClient();
await client.connect("mongodb+srv://cmAdmin:8OxpklTtmBP5so18@cluster0-0walf.mongodb.net");

export default client.database('class-scores');