"use client";

import { NewsItem as NewsItemType, CATEGORY_LABELS } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { da } from "date-fns/locale";
import SummaryPopover from "./SummaryPopover";

interface NewsItemProps {
  item: NewsItemType;
}

export default function NewsItem({ item }: NewsItemProps) {
  const timeAgo = (() => {
    try {
      return formatDistanceToNow(new Date(item.pubDate), { addSuffix: true, locale: da });
    } catch {
      return "";
    }
  })();

  return (
    <article className="py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">
          {item.sourceIcon}
        </span>
        <div className="flex-1 min-w-0">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug block"
          >
            {item.title}
          </a>
          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-gray-500 dark:text-gray-500">
            <span className="font-medium">{item.source}</span>
            {timeAgo && (
              <>
                <span>·</span>
                <span>{timeAgo}</span>
              </>
            )}
            {item.category !== "general" && (
              <>
                <span>·</span>
                <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                  {CATEGORY_LABELS[item.category]}
                </span>
              </>
            )}
          </div>
          {item.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {item.description}
            </p>
          )}
          <div className="mt-2">
            <SummaryPopover title={item.title} description={item.description} />
          </div>
        </div>
      </div>
    </article>
  );
}
