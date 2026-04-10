import { createFileRoute, Link } from "@tanstack/react-router";
import { BlogCard } from "@/components/patterns/blog-card";
import { searchPosts } from "@/lib/blog";

interface SearchParams {
  q?: string;
  topic?: string;
}

function SearchPage() {
  const { q, topic, posts, topics } = Route.useLoaderData();

  return (
    <>
      <div className="mb-8">
        <Link
          className="mb-4 inline-flex items-center text-red-600 text-sm transition-colors hover:text-red-700"
          to="/"
        >
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Back arrow</title>
            <path
              d="M15 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          All posts
        </Link>
        <h1 className="font-bold text-3xl text-gray-900">
          {q ? `Search results for "${q}"` : "Search results"}
        </h1>
        <p className="mt-2 text-gray-500">
          {posts.length} {posts.length === 1 ? "article" : "articles"} found
          {topic ? ` in "${topic}"` : ""}
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-gray-500 text-lg">
                No articles found. Try a different search term.
              </p>
            </div>
          )}
        </div>

        {topics.length > 0 && (
          <aside className="w-full shrink-0 lg:w-64">
            <div className="sticky top-8 rounded-xl border border-gray-100 bg-gray-50 p-5">
              <h2 className="mb-4 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                Filter by topic
              </h2>
              <div className="flex flex-col gap-1.5">
                {topics.map(({ topic: t, count }) => {
                  const isActive = t.toLowerCase() === topic.toLowerCase();
                  return (
                    <Link
                      className={`flex items-center justify-between rounded-lg px-3 py-2 font-medium text-sm transition-colors duration-200 ${
                        isActive
                          ? "bg-red-600 text-white"
                          : "text-gray-700 hover:bg-red-50 hover:text-red-700"
                      }`}
                      key={t}
                      search={(prev) => ({
                        ...prev,
                        topic: isActive ? undefined : t,
                      })}
                      to="/search"
                    >
                      <span>{t}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          isActive
                            ? "bg-red-500 text-white"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {count}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : undefined,
    topic: typeof search.topic === "string" ? search.topic : undefined,
  }),
  loaderDeps: ({ search }) => ({ q: search.q, topic: search.topic }),
  loader: ({ deps: { q, topic } }) => {
    let posts = q ? searchPosts(q, "en") : [];
    if (topic) {
      posts = posts.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === topic.toLowerCase())
      );
    }

    // Build topic counts from search results for facets
    const topicMap = new Map<string, number>();
    const allResults = q ? searchPosts(q, "en") : [];
    for (const post of allResults) {
      for (const tag of post.tags) {
        topicMap.set(tag, (topicMap.get(tag) || 0) + 1);
      }
    }
    const topics = Array.from(topicMap.entries())
      .map(([t, count]) => ({ topic: t, count }))
      .sort((a, b) => b.count - a.count);

    return { q: q || "", topic: topic || "", posts, topics };
  },
  component: SearchPage,
});
