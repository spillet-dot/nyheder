import { NextRequest, NextResponse } from "next/server";
import { generateSummary } from "@/lib/summarizer";

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "API-nøgle mangler. Tilføj ANTHROPIC_API_KEY i .env.local" },
      { status: 503 }
    );
  }

  try {
    const { title, description } = await request.json();

    if (!title) {
      return NextResponse.json({ error: "Titel er påkrævet" }, { status: 400 });
    }

    const summary = await generateSummary(title, description || "");

    return NextResponse.json(
      { summary },
      {
        headers: {
          "Cache-Control": "s-maxage=86400, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("Resumé-generering fejlede:", error);
    return NextResponse.json(
      { error: "Kunne ikke generere resumé. Prøv igen." },
      { status: 500 }
    );
  }
}
