import { Category } from "./types";

const CATEGORY_KEYWORDS: Record<Exclude<Category, "alle" | "general">, string[]> = {
  llm: ["llm", "language model", "gpt", "claude", "gemini", "chatbot", "transformer", "token", "chatgpt", "copilot", "mistral", "llama", "anthropic", "openai"],
  robotics: ["robot", "humanoid", "autonomous", "drone", "self-driving", "boston dynamics", "tesla bot", "optimus"],
  regulation: ["regulation", "eu ai act", "policy", "legislation", "safety", "alignment", "governance", "ban", "law", "regulering"],
  startups: ["startup", "funding", "series a", "series b", "acquisition", "valuation", "raise", "venture", "seed round"],
  research: ["paper", "research", "arxiv", "study", "benchmark", "dataset", "training", "model weights", "breakthrough"],
};

export function categorize(title: string, description: string): Category {
  const text = `${title} ${description}`.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) {
      return category as Category;
    }
  }
  return "general";
}
