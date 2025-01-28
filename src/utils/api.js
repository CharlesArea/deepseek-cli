import OpenAI from "openai";
import config from "../config.js";
import chalk from "chalk";

export function createClient() {
  const apiKey = config.get("apiKey");
  const baseURL = config.get("baseURL");

  if (!apiKey) {
    throw new Error(
      "API key not configured. Run 'deepseek config' to set up. \nIf you need an API key, visit https://platform.deepseek.com/api_keys\n"
    );
    // throw new Error('API key not configured. Run "deepseek config" to set up.');
  }

  return new OpenAI({
    baseURL: baseURL,
    apiKey: apiKey,
    timeout: 30000, // 30 seconds timeout
    maxRetries: 3,
  });
}

export async function query(prompt) {
  const client = createClient();
  const model = config.get("model");
  const temperature = config.get("temperature");
  const systemPrompt = config.get("systemPrompt");
  const maxTokens = config.get("maxTokens");

  try {
    const completion = await client.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      model: model,
      temperature: temperature,
      max_tokens: maxTokens,
    });

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error("No response received from the API");
    }

    return completion.choices[0].message.content;
  } catch (error) {
    if (error.response) {
      throw new Error(`API Error: ${error.response.data.error.message}`);
    } else if (error.code === "ECONNABORTED") {
      throw new Error("Request timed out. Please try again.");
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
}
