import { createFileRoute, Link } from "@tanstack/react-router";
import { BlogCard } from "@/components/patterns/blog-card";
import { getPostsByTopic, isPublished } from "@/lib/blog";
import { type Lang, t } from "@/lib/i18n";

function TopicPage() {
  const { topic, posts: allPosts, lang } = Route.useLoaderData();
  const posts = allPosts.filter((p) => isPublished(p.date));

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
          {t(lang, "postsAbout")} &ldquo;{topic}&rdquo;
        </h1>
        <p className="mt-2 text-gray-500">
          {posts.length}{" "}
          {posts.length === 1
            ? t(lang, "articleFound")
            : t(lang, "articlesFound")}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}

export const Route = createFileRoute("/$lang/topics/$topic")({
  loader: ({ params }) => {
    const lang = params.lang as Lang;
    const topic = decodeURIComponent(params.topic);
    const posts = getPostsByTopic(topic, lang);
    return { topic, posts, lang };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { topic, posts, lang } = loaderData;
    const isEs = lang === "es";
    const title = isEs
      ? `Artículos sobre ${topic} (${posts.length}) – Lorenzo GM`
      : `Articles about ${topic} (${posts.length}) – Lorenzo GM`;
    const description = isEs
      ? `${posts.length} artículos sobre ${topic} en el blog de Lorenzo GM.`
      : `${posts.length} articles about ${topic} on Lorenzo GM's blog.`;
    const url = `https://lorenzogm.com/${lang}/topics/${encodeURIComponent(topic)}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: TopicPage,
});
