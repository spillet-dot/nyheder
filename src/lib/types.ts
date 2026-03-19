export interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  sourceIcon: string;
  description: string;
  category: Category;
}

export type Category = "alle" | "llm" | "robotics" | "regulation" | "startups" | "research" | "general";

export type Tab = "generelt" | "google" | "claude" | "github";

export const CATEGORY_LABELS: Record<Category, string> = {
  alle: "Alle",
  llm: "LLM'er",
  robotics: "Robotteknologi",
  regulation: "AI-regulering",
  startups: "Startups",
  research: "Forskning",
  general: "Generelt",
};
