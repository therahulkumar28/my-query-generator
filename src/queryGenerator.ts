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
IMPORTANT: Only return valid MongoDB query in JSON format.
If the question is not related to the schema, return this exact JSON: []


Input: ${userQuestion}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0
  });
  console.log(completion)
  console.log('--------------------------------------------------------------------------------')
  const rawText = completion.choices[0].message.content || "";
  console.log("🟡 Raw AI Response:", rawText);

  // Remove "Output: " label if it exists
  const queryText = rawText.replace("Output:", "").trim();

  try {
    const parsed = JSON.parse(queryText);
    console.log("✅ Parsed Query:", parsed);
    return parsed;
  } catch (err) {
    console.error("❌ Failed to parse response:", queryText);
    throw new Error("Invalid JSON returned by the model.");
  }
  
}
