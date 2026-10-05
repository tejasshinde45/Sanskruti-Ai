import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(API_KEY);

export async function refineShloka(partialShloka: string) {
  if (!API_KEY) throw new Error("Gemini API key is not configured.");
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const prompt = `You are a Vedic Scholar AI.
The user has provided a partial or incorrect shloka or verse in Sanskrit or transliteration.
Your task is to identify the correct complete shloka.

User Input: "${partialShloka}"

Return a JSON object with the following fields:
{
  "sanskrit": "The correct complete shloka in Devanagari script",
  "transliteration": "The correct complete shloka in English transliteration",
  "source": "The source scripture (e.g. Bhagavad Gita)",
  "chapter": "Chapter number if applicable (e.g. 2)",
  "verse": "Verse number if applicable (e.g. 47)"
}
Return ONLY valid JSON. Do not include markdown formatting like \`\`\`json.`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
  
  return JSON.parse(responseText);
}

export async function explainShloka(shlokaData: any) {
  if (!API_KEY) throw new Error("Gemini API key is not configured. Please add it to your .env file.");

  const prompt = `You are a Vedic Scholar AI.
Analyze the following Shloka:
${JSON.stringify(shlokaData, null, 2)}

Return a JSON object with this exact structure:
{
  "basic": "Simple, beginner-friendly translation and meaning.",
  "deep": "Detailed philosophical meaning and practical application in daily life.",
  "spiritual": "Profound esoteric or spiritual significance."
}
Return ONLY valid JSON.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
    const explanations = JSON.parse(responseText);
    return {
      id: 'custom-' + Date.now(),
      ...shlokaData,
      explanations: explanations.explanations || explanations
    };
  } catch (error: any) {
    console.warn("gemini-2.5-flash failed, falling back to gemini-2.0-flash", error);
    try {
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await fallbackModel.generateContent(prompt);
      const responseText = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
      const explanations = JSON.parse(responseText);
      return {
        id: 'custom-' + Date.now(),
        ...shlokaData,
        explanations: explanations.explanations || explanations
      };
    } catch (fallbackError: any) {
      throw new Error("Models are currently overloaded. Please try again in a few moments.");
    }
  }
}

export async function answerQuestion(question: string) {
  if (!API_KEY) throw new Error("Gemini API key is not configured.");
  
  const prompt = `You are a deeply wise, warm, and loving Indian sage (a Vedic scholar). 
The user is asking you a question about Indian culture, spirituality, or ancient traditions.
CRITICAL INSTRUCTIONS:
- Speak as if you are a real, compassionate human talking to a friend. Use a warm, comforting, and deeply spiritual tone.
- If the user asks in Hindi, reply entirely in pure, beautiful Hindi. If they ask in English, reply in English but feel free to naturally include beautiful Sanskrit or Hindi words (like "Namaste", "Dharma", "Karma", "Beta") where appropriate.
- Keep the answer concise (2-4 sentences) so it flows perfectly for Text-to-Speech audio.
- Write with emotion, using natural pauses (using commas or dashes) to make the audio sound deeply human.

User Question: "${question}"`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error: any) {
    console.warn("gemini-2.5-flash failed, falling back to gemini-2.0-flash", error);
    try {
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await fallbackModel.generateContent(prompt);
      return result.response.text().trim();
    } catch (fallbackError: any) {
      throw new Error(error.message || "Models are currently overloaded. Please try again in a few moments.");
    }
  }
}
