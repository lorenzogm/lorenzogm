import { createFileRoute, Link } from "@tanstack/react-router";
import { BlogCard } from "@/components/patterns/blog-card";
import { TopicFilter } from "@/components/patterns/topic-filter";
import { getAllPosts, searchPosts } from "@/lib/blog";
import { type Lang, t } from "@/lib/i18n";

interface SearchParams {
  q?: string;
  topic?: string;
}

function SearchPage() {
  const { q, topic, posts, topics, lang } = Route.useLoaderData();

  return (
    <>
      <div className="mb-8">
        <Link
          className="mb-4 inline-flex items-center text-red-600 text-sm transition-colors hover:text-red-700"
          params={{ lang }}
          to="/$lang"
        >
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>{t(lang, "backArrow")}</title>
            <path
              d="M15 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          {t(lang, "allPosts")}
        </Link>
        <h1 className="font-bold text-3xl text-gray-900">
          {q
            ? `${t(lang, "searchResultsFor")} "${q}"`
            : t(lang, "searchResults")}
        </h1>
        <p className="mt-2 text-gray-500">
          {posts.length}{" "}
          {posts.length === 1
            ? t(lang, "articleFound")
            : t(lang, "articlesFound")}{" "}
          {t(lang, "found")}
          {topic ? ` ${t(lang, "in")} "${topic}"` : ""}
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <TopicFilter
          activeTopic={topic}
          labels={{
            filterByTopic: t(lang, "filterByTopic"),
            filters: t(lang, "filters"),
            apply: t(lang, "apply"),
            clearAll: t(lang, "clearAll"),
          }}
          params={{ lang }}
          searchRoute="/$lang/search"
          topics={topics}
        />

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
                {t(lang, "noArticlesFound")}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const Route = createFileRoute("/$lang/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : undefined,
    topic: typeof search.topic === "string" ? search.topic : undefined,
  }),
  loaderDeps: ({ search }) => ({ q: search.q, topic: search.topic }),
  loader: ({ deps: { q, topic }, params }) => {
    const lang = params.lang as Lang;
    let posts = q ? searchPosts(q, lang) : getAllPosts(lang);
    if (topic) {
      posts = posts.filter((p) =>
        p.tags.some((tag) => tag.toLowerCase() === topic.toLowerCase())
      );
    }

    const topicMap = new Map<string, number>();
    const allResults = q ? searchPosts(q, lang) : getAllPosts(lang);
    for (const post of allResults) {
      for (const tag of post.tags) {
        topicMap.set(tag, (topicMap.get(tag) || 0) + 1);
      }
    }
    const topics = Array.from(topicMap.entries())
      .map(([topicName, count]) => ({ topic: topicName, count }))
      .sort((a, b) => b.count - a.count);

    return { q: q || "", topic: topic || "", posts, topics, lang };
  },
  head: ({ loaderData }) => {
    const { q, lang, posts } = loaderData;
    const isEs = lang === "es";
    const title = q
      ? `${isEs ? "Resultados para" : "Results for"} "${q}" – Lorenzo GM`
      : `${isEs ? "Buscar artículos" : "Search articles"} – Lorenzo GM`;
    const description = q
      ? `${posts.length} ${isEs ? "artículos encontrados para" : "articles found for"} "${q}"`
      : isEs
        ? "Busca en todos los artículos del blog de Lorenzo GM."
        : "Search through all blog articles by Lorenzo GM.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "noindex, follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: SearchPage,
});
