"use client";

import { useState } from "react";

interface SummaryPopoverProps {
  title: string;
  description: string;
}

export default function SummaryPopover({ title, description }: SummaryPopoverProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function fetchSummary() {
    if (summary) {
      setOpen(!open);
      return;
    }

    setOpen(true);
    setLoading(true);

    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      setSummary(data.summary || "Kunne ikke generere resumé.");
    } catch {
      setSummary("Fejl ved generering af resumé.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={fetchSummary}
        className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
      >
        {open ? "Skjul resumé" : "Resumé"}
      </button>
      {open && (
        <div className="mt-2 p-3 text-sm bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          {loading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Genererer dansk resumé...
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">{summary}</p>
          )}
        </div>
      )}
    </div>
  );
}
