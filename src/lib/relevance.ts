// Relevance scoring based on Spilletlivet's tech stack and interests
// Higher score = more relevant to Martin's business

const RELEVANCE_KEYWORDS: { words: string[]; weight: number }[] = [
  // Core tech stack (highest priority)
  { words: ["supabase", "postgresql", "row level security", "rls"], weight: 10 },
  { words: ["fastapi", "fast api"], weight: 10 },
  { words: ["react three fiber", "r3f", "three.js", "threejs", "3d web"], weight: 10 },
  { words: ["next.js", "nextjs", "next js", "vercel"], weight: 8 },
  { words: ["claude", "anthropic", "claude code"], weight: 10 },
  { words: ["mcp", "model context protocol"], weight: 10 },

  // AI agents & autonomous systems
  { words: ["ai agent", "ai agents", "autonomous agent", "agentic", "agent framework", "multi-agent"], weight: 9 },
  { words: ["langchain", "langgraph", "crewai", "autogen"], weight: 7 },

  // LLM & AI models
  { words: ["gemini", "google ai"], weight: 8 },
  { words: ["llm", "large language model"], weight: 5 },
  { words: ["fine-tuning", "fine tuning", "rag", "retrieval augmented"], weight: 7 },
  { words: ["prompt engineering", "system prompt"], weight: 6 },

  // SaaS & business
  { words: ["saas", "software as a service"], weight: 6 },
  { words: ["freemium", "subscription model", "pricing model"], weight: 5 },
  { words: ["solo founder", "indie hacker", "solopreneur", "bootstrapped"], weight: 7 },

  // Edge computing & privacy
  { words: ["edge computing", "edge ai", "on-device", "local ai", "offline ai"], weight: 8 },
  { words: ["gdpr", "data privacy", "data sovereignty", "zero trust"], weight: 7 },
  { words: ["ollama", "local llm", "self-hosted"], weight: 7 },

  // Wellness & cognitive tech
  { words: ["wellness", "mental health", "cognitive", "mindfulness", "wellbeing"], weight: 6 },
  { words: ["wearable", "apple watch", "hrv", "biometric"], weight: 6 },

  // Apple & hardware
  { words: ["apple silicon", "mac studio", "m4", "m5", "unified memory"], weight: 7 },

  // NotebookLM
  { words: ["notebooklm", "notebook lm"], weight: 9 },

  // Open source AI tools
  { words: ["open source ai", "hugging face", "huggingface"], weight: 5 },

  // B2B enterprise
  { words: ["b2b", "enterprise", "hr tech"], weight: 5 },

  // DevOps & infrastructure
  { words: ["docker", "kubernetes", "ci/cd", "devops"], weight: 3 },

  // General AI (lower priority - already covered by being on the site)
  { words: ["artificial intelligence", "machine learning", "deep learning"], weight: 2 },
];

export function scoreRelevance(title: string, description: string): number {
  const text = `${title} ${description}`.toLowerCase();
  let score = 0;

  for (const group of RELEVANCE_KEYWORDS) {
    for (const word of group.words) {
      if (text.includes(word)) {
        score += group.weight;
        break; // Only count each group once
      }
    }
  }

  return score;
}
