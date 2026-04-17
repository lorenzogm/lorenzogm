import { createFileRoute } from "@tanstack/react-router";
import { BlogCard } from "@/components/patterns/blog-card";
import { TopicCloud } from "@/components/patterns/topic-cloud";
import { getAllPosts, getTopicCounts, isPublished } from "@/lib/blog";
import { type Lang, t } from "@/lib/i18n";

function Home() {
  const { posts: allPosts, topics, lang } = Route.useLoaderData();
  const posts = allPosts.filter((p) => isPublished(p.date));

  return (
    <>
      <h2 className="mb-4 font-bold text-2xl text-gray-900">
        {t(lang, "searchBlogByTopic")}
      </h2>
      <TopicCloud lang={lang} limit={8} topics={topics} />

      <h2 className="mb-8 font-bold text-2xl text-gray-900">
        {t(lang, "articles")}
      </h2>
      <div className="space-y-12">
        {posts.length > 0 && (
          <BlogCard featured={true} key={posts[0].slug} post={posts[0]} />
        )}

        {posts.length > 1 && (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.slice(1).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>

      {posts.length === 0 && (
        <div className="py-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>{t(lang, "noPostsIcon")}</title>
              <path
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">{t(lang, "noPosts")}</p>
        </div>
      )}
    </>
  );
}

export const Route = createFileRoute("/$lang/")({
  loader: ({ params }) => {
    const lang = params.lang as Lang;
    return {
      posts: getAllPosts(lang),
      topics: getTopicCounts(lang),
      lang,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { lang } = loaderData;
    const isEs = lang === "es";
    const title = isEs
      ? "Lorenzo GM – Blog sobre Desarrollo Web e Ingeniería de Software"
      : "Lorenzo GM – Blog on Web Development & Software Engineering";
    const description = isEs
      ? "Artículos sobre desarrollo web, arquitectura frontend, React, TypeScript y prácticas modernas de ingeniería de software por Lorenzo GM."
      : "Insights on web development, frontend architecture, React, TypeScript, and modern software engineering practices by Lorenzo GM.";
    const url = `https://lorenzogm.com/${lang}/`;
    const altLang = isEs ? "en" : "es";
    const altUrl = `https://lorenzogm.com/${altLang}/`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: isEs ? "es_ES" : "en_US" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "alternate", hrefLang: lang, href: url },
        { rel: "alternate", hrefLang: altLang, href: altUrl },
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: "https://lorenzogm.com/en/",
        },
      ],
    };
  },
  component: Home,
});
