import  dotenv from "dotenv";
dotenv.config();


console.log(process.env.OPEN_AI_KEY)
export const ConfigData = {
  OPEN_AI_KEY: process.env.OPENAI_API_KEY,
  MONGO_DB_URI: process.env.MONGO_DB_URI || "ERROR",
  DB_NAME: "your-db-name",
  COLLECTION_NAME: "your-collection-name"
};
