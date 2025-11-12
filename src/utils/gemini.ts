import { GoogleGenAI } from "@google/genai";

export interface QuizQuestion {
  question: string;
  options: { A: string; B: string; C: string };
  correctAnswer: "A" | "B" | "C";
}

async function getApiKey(): Promise<string | null> {
  return (await chrome.storage.sync.get("geminiApiKey")).geminiApiKey || null;
}

const GEMINI_MODEL = "gemini-2.5-flash-lite";
const MAX_TEXT_LENGTH = 10000;

export const generateQuiz = async (
  textContent: string
): Promise<QuizQuestion[]> => {
  const API_KEY = await getApiKey();

  if (!API_KEY) {
    throw new Error(
      "API key not set. Please right-click the extension icon, go to 'Options', and set your Gemini API key."
    );
  }
  const ai = new GoogleGenAI({
    apiKey: API_KEY,
  });

  const limitedText = textContent.substring(0, MAX_TEXT_LENGTH);

  const prompt = `
  Based on the following text, generate a 4-question multiple-choice quiz.
  For each question, provide 3 options (A, B, C) and identify the correct answer.
  Return the response *only* as a valid JSON array matching this Typescript interface:
  
  interface QuizQuestion {
    question: string;
    options: { A: string; B: string; C: string; };
    correctAnswer: "A" | "B" | "C";
  }

  Here is the text:
  ---
  ${limitedText}
  ---
  `;
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
  });
  console.log("Raw response", response.text);

  try {
    const cleanJson = response
      .text!.replace("```json", "")
      .replace("```", "")
      .replace("\n", "")
      .trim();
    const quizData = JSON.parse(cleanJson);

    return quizData;
  } catch (e) {
    console.error("Failed to parse AI response as JSON:", e);
    throw new Error("AI returned invalid data format.");
  }
};
