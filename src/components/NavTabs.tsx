"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/generelt", label: "AI Nyheder" },
  { href: "/google", label: "Google AI" },
  { href: "/claude", label: "Claude & Anthropic" },
  { href: "/github", label: "GitHub" },
];

export default function NavTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || (pathname === "/" && tab.href === "/generelt");
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              isActive
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
