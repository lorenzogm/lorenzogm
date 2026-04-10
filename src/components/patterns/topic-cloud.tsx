import { Link } from "@tanstack/react-router";
import type { TopicCount } from "@/lib/blog";

interface TopicCloudProps {
  lang?: string;
  limit?: number;
  topics: TopicCount[];
}

export function TopicCloud({ topics, lang = "en", limit }: TopicCloudProps) {
  if (topics.length === 0) return null;

  const displayed = limit ? topics.slice(0, limit) : topics;
  const hasMore = limit !== undefined && topics.length > limit;

  return (
    <div className="mb-12 flex flex-wrap gap-2">
      {displayed.map(({ topic, count }) => (
        <Link
          className="inline-flex items-center gap-1.5 rounded-full border border-red-200/50 bg-red-50 px-4 py-2 font-semibold text-red-700 text-sm transition-colors duration-200 hover:bg-red-100"
          key={topic}
          params={{ lang, topic: topic.toLowerCase() }}
          to="/$lang/topics/$topic"
        >
          {topic}
          <span className="rounded-full bg-red-200/60 px-1.5 py-0.5 text-red-800 text-xs">
            {count}
          </span>
        </Link>
      ))}
      {hasMore && (
        <Link
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 font-semibold text-gray-600 text-sm transition-colors duration-200 hover:bg-gray-100"
          params={{ lang }}
          to="/$lang/topics"
        >
          {lang === "es" ? "Ver todos" : "Show all"}
        </Link>
      )}
    </div>
  );
}
