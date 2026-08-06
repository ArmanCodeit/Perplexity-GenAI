import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.6-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

export async function testAIService() {
  const response = await model.invoke("Hello, What is AI explain under 100 words ??");
  console.log(response.text);
}