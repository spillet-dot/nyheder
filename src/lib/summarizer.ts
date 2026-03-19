import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) {
    client = new Anthropic();
  }
  return client;
}

export async function generateSummary(title: string, description: string): Promise<string> {
  const anthropic = getClient();

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 200,
    system:
      "Du er en dansk nyhedsredaktør. Skriv et kort resumé (2-3 sætninger) på dansk af denne AI-nyhed. Vær præcis og informativ.",
    messages: [
      {
        role: "user",
        content: `Titel: ${title}\n\nBeskrivelse: ${description || "(ingen beskrivelse tilgængelig)"}`,
      },
    ],
  });

  const block = response.content[0];
  return block.type === "text" ? block.text : "";
}
