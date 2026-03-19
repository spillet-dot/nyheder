import { NextRequest, NextResponse } from "next/server";
import { generateSummary } from "@/lib/summarizer";

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
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
    console.error("Summary generation failed:", error);
    return NextResponse.json(
      { error: "Kunne ikke generere resumé" },
      { status: 500 }
    );
  }
}
