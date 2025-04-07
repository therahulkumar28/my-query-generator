import { MongoClient } from "mongodb";
import { ConfigData } from "./config";
import { getMongoQuery } from "./queryGenerator";

async function main() {
  const client = new MongoClient(ConfigData.MONGO_DB_URI);
  await client.connect();

  const db = client.db(ConfigData.DB_NAME);
  const collection = db.collection(ConfigData.COLLECTION_NAME);

  const userQuestion = "When was InnovateTech Solutions founded?";
  const query = await getMongoQuery(userQuestion);

  const result = await collection.aggregate(query).toArray();
  console.log("MongoDB Result:", result);

  await client.close();
}

main().catch(console.error);
