import { Tab } from "./types";

export interface FeedConfig {
  name: string;
  url: string;
  icon: string;
}

export const FEEDS: Record<Tab, FeedConfig[]> = {
  generelt: [
    { name: "TechCrunch", url: "https://techcrunch.com/category/artificial-intelligence/feed/", icon: "TC" },
    { name: "VentureBeat", url: "https://venturebeat.com/category/ai/feed/", icon: "VB" },
    { name: "MIT Tech Review", url: "https://www.technologyreview.com/feed/", icon: "MIT" },
    { name: "The Verge", url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", icon: "TV" },
    { name: "Ars Technica", url: "https://feeds.arstechnica.com/arstechnica/technology-lab", icon: "AT" },
    { name: "Wired", url: "https://www.wired.com/feed/tag/ai/latest/rss", icon: "WI" },
  ],
  google: [
    { name: "Google AI Blog", url: "https://blog.google/technology/ai/rss/", icon: "G" },
    { name: "DeepMind", url: "https://deepmind.google/blog/rss.xml", icon: "DM" },
  ],
  claude: [
    { name: "Reddit r/ClaudeAI", url: "https://www.reddit.com/r/ClaudeAI/.rss", icon: "R" },
    { name: "Reddit r/anthropic", url: "https://www.reddit.com/r/anthropic/.rss", icon: "R" },
  ],
  github: [
    // Martin's core stack - releases & updates
    { name: "Next.js", url: "https://github.com/vercel/next.js/releases.atom", icon: "NX" },
    { name: "Supabase", url: "https://github.com/supabase/supabase/releases.atom", icon: "SB" },
    { name: "Anthropic SDK", url: "https://github.com/anthropics/anthropic-sdk-python/releases.atom", icon: "AN" },
    { name: "Claude Code", url: "https://github.com/anthropics/claude-code/releases.atom", icon: "CC" },
    { name: "Vercel AI SDK", url: "https://github.com/vercel/ai/releases.atom", icon: "VA" },
    { name: "React Three Fiber", url: "https://github.com/pmndrs/react-three-fiber/releases.atom", icon: "R3" },
    { name: "FastAPI", url: "https://github.com/fastapi/fastapi/releases.atom", icon: "FA" },
    { name: "MCP Spec", url: "https://github.com/modelcontextprotocol/specification/releases.atom", icon: "MC" },
    // AI/LLM open source
    { name: "Ollama", url: "https://github.com/ollama/ollama/releases.atom", icon: "OL" },
    { name: "LangChain", url: "https://github.com/langchain-ai/langchain/releases.atom", icon: "LC" },
    // GitHub Blog
    { name: "GitHub Blog", url: "https://github.blog/feed/", icon: "GH" },
  ],
};

export const ANTHROPIC_BLOG_URL = "https://www.anthropic.com/news";

export const GOOGLE_KEYWORDS = ["google", "deepmind", "gemini", "bard", "palm", "google ai"];
