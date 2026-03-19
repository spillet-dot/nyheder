import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import NavTabs from "@/components/NavTabs";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Nyheder — Seneste opdateringer om kunstig intelligens",
  description: "Hold dig opdateret med de nyeste AI-nyheder fra TechCrunch, Google, Anthropic og mere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className={geist.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-3xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between mb-2 sm:mb-0">
                <h1 className="text-lg font-bold tracking-tight shrink-0 mr-6">AI Nyheder</h1>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block">
                    <NavTabs />
                  </div>
                  <ThemeToggle />
                </div>
              </div>
              <div className="sm:hidden -mx-4 px-4">
                <NavTabs />
              </div>
            </div>
          </header>
          <main className="max-w-3xl mx-auto px-4 py-6">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
