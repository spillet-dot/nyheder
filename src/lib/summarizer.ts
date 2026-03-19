import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }
  return genAI;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/^#+\s*/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

export async function generateSummary(title: string, description: string): Promise<string> {
  const ai = getClient();
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Skriv 2-3 sætninger på dansk der opsummerer denne AI-nyhed. Skriv KUN selve resuméet – ingen overskrift, ingen indledning som "Her er et resumé", ingen markdown-formatering. Bare ren tekst.\n\nTitel: ${title}\n\nBeskrivelse: ${description || "(ingen beskrivelse tilgængelig)"}`,
          },
        ],
      },
    ],
  });

  return stripMarkdown(result.response.text());
}
