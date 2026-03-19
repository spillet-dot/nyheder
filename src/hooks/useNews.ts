"use client";

import useSWR from "swr";
import { NewsItem, Tab, Category } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useNews(tab: Tab, category: Category = "alle") {
  const { data, error, isLoading, isValidating } = useSWR<{ items: NewsItem[] }>(
    `/api/news?tab=${tab}`,
    fetcher,
    {
      refreshInterval: 5 * 60 * 1000,
      revalidateOnFocus: true,
      dedupingInterval: 60 * 1000,
    }
  );

  const items =
    category && category !== "alle"
      ? data?.items.filter((item) => item.category === category)
      : data?.items;

  return { items: items || [], error, isLoading, isValidating };
}
