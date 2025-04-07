import OpenAI from "openai";
import { ConfigData } from "./config";
import { TABLE_SCHEMA, SCHEMA_DESCRIPTION, FEW_SHOT_EXAMPLE } from "./schema";

const openai = new OpenAI({ apiKey: ConfigData.OPEN_AI_KEY });

export async function getMongoQuery(userQuestion: string): Promise<any[]> {
  const prompt = `
You are an expert MongoDB engineer.

Table Schema:
${TABLE_SCHEMA}

Schema Description:
${SCHEMA_DESCRIPTION}

Example:
${FEW_SHOT_EXAMPLE}

NOTE: Only return MongoDB query as JSON.

Input: ${userQuestion}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0
  });

  // Get only the query from response
  const text = completion.choices[0].message.content || "";
  const queryText = text.replace("Output: ", "").trim();

  // Parse the string into a real JS object
  return JSON.parse(queryText);
}
