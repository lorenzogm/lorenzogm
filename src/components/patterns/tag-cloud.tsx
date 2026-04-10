import { Link } from "@tanstack/react-router";
import type { TagCount } from "@/lib/blog";

interface TagCloudProps {
  lang?: string;
  tags: TagCount[];
}

export function TagCloud({ tags, lang = "en" }: TagCloudProps) {
  if (tags.length === 0) return null;

  return (
    <div className="mb-12 flex flex-wrap gap-2">
      {tags.map(({ tag, count }) => (
        <Link
          className="inline-flex items-center gap-1.5 rounded-full border border-red-200/50 bg-red-50 px-4 py-2 font-semibold text-red-700 text-sm transition-colors duration-200 hover:bg-red-100"
          key={tag}
          params={{ tag: tag.toLowerCase() }}
          to={lang === "es" ? "/es/tag/$tag" : "/tag/$tag"}
        >
          {tag}
          <span className="rounded-full bg-red-200/60 px-1.5 py-0.5 text-red-800 text-xs">
            {count}
          </span>
        </Link>
      ))}
    </div>
  );
}
