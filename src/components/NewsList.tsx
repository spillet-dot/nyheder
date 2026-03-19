"use client";

import { useState } from "react";
import { Tab, Category } from "@/lib/types";
import { useNews } from "@/hooks/useNews";
import NewsItem from "./NewsItem";
import CategoryFilter from "./CategoryFilter";

interface NewsListProps {
  tab: Tab;
}

export default function NewsList({ tab }: NewsListProps) {
  const [category, setCategory] = useState<Category>("alle");
  const { items, isLoading, error } = useNews(tab, category);

  if (error) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg">Kunne ikke hente nyheder</p>
        <p className="text-sm mt-1">Prøv igen om lidt</p>
      </div>
    );
  }

  return (
    <div>
      <CategoryFilter selected={category} onChange={setCategory} />

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse py-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-md bg-gray-200 dark:bg-gray-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800/50 rounded w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg">Ingen nyheder fundet</p>
          <p className="text-sm mt-1">Prøv en anden kategori</p>
        </div>
      ) : (
        <div>
          {items.map((item, index) => (
            <NewsItem key={`${item.id}-${index}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
