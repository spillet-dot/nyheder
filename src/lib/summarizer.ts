import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }
  return genAI;
}

export async function generateSummary(title: string, description: string): Promise<string> {
  const ai = getClient();
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Du er en dansk nyhedsredaktør. Skriv et kort resumé (2-3 sætninger) på dansk af denne AI-nyhed. Vær præcis og informativ.\n\nTitel: ${title}\n\nBeskrivelse: ${description || "(ingen beskrivelse tilgængelig)"}`,
          },
        ],
      },
    ],
  });

  return result.response.text();
}
