import { createFileRoute, Link } from "@tanstack/react-router";
import { BlogCard } from "@/components/patterns/blog-card";
import { getAllPosts, searchPosts } from "@/lib/blog";

interface SearchParams {
  q?: string;
  topic?: string;
}

function SpanishSearchPage() {
  const { q, topic, posts, topics } = Route.useLoaderData();

  return (
    <>
      <div className="mb-8">
        <Link
          className="mb-4 inline-flex items-center text-red-600 text-sm transition-colors hover:text-red-700"
          to="/es"
        >
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Flecha atrás</title>
            <path
              d="M15 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Todos los artículos
        </Link>
        <h1 className="font-bold text-3xl text-gray-900">
          {q ? `Resultados de búsqueda para "${q}"` : "Resultados de búsqueda"}
        </h1>
        <p className="mt-2 text-gray-500">
          {posts.length} {posts.length === 1 ? "artículo" : "artículos"}{" "}
          encontrado{posts.length === 1 ? "" : "s"}
          {topic ? ` en "${topic}"` : ""}
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {topics.length > 0 && (
          <aside className="order-first w-full shrink-0 md:w-56 lg:w-64">
            <div className="sticky top-8 rounded-xl border border-gray-100 bg-gray-50 p-5">
              <h2 className="mb-4 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                Filtrar por tema
              </h2>
              <div className="flex flex-wrap gap-1.5 md:flex-col">
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
                      to="/es/search"
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

        <div className="min-w-0 flex-1">
          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-gray-500 text-lg">
                No se encontraron artículos. Intenta con otro término de
                búsqueda.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const Route = createFileRoute("/es/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : undefined,
    topic: typeof search.topic === "string" ? search.topic : undefined,
  }),
  loaderDeps: ({ search }) => ({ q: search.q, topic: search.topic }),
  loader: ({ deps: { q, topic } }) => {
    let posts = q ? searchPosts(q, "es") : getAllPosts("es");
    if (topic) {
      posts = posts.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === topic.toLowerCase())
      );
    }

    const topicMap = new Map<string, number>();
    const allResults = q ? searchPosts(q, "es") : getAllPosts("es");
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
  component: SpanishSearchPage,
});
