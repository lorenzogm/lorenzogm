import { createFileRoute } from "@tanstack/react-router";
import { TopicCloud } from "@/components/patterns/topic-cloud";
import { getTopicCounts } from "@/lib/blog";
import { type Lang, t } from "@/lib/i18n";

function TopicsPage() {
  const { topics, lang } = Route.useLoaderData();

  return (
    <>
      <div className="mb-8">
        <h1 className="font-bold text-3xl text-gray-900">
          {t(lang, "topics")}
        </h1>
        <p className="mt-2 text-gray-500">
          {t(lang, "browseAllTopics")} {topics.length} {t(lang, "topicsLabel")}
        </p>
      </div>

      <TopicCloud lang={lang} topics={topics} />
    </>
  );
}

export const Route = createFileRoute("/$lang/topics/")({
  loader: ({ params }) => {
    const lang = params.lang as Lang;
    return { topics: getTopicCounts(lang), lang };
  },
  head: ({ loaderData }) => {
    const { lang, topics } = loaderData;
    const isEs = lang === "es";
    const title = isEs
      ? `Temas (${topics.length}) – Lorenzo GM`
      : `Topics (${topics.length}) – Lorenzo GM`;
    const description = isEs
      ? "Explora todos los temas del blog: frontend, TypeScript, React, arquitectura y más."
      : "Browse all blog topics: frontend, TypeScript, React, architecture and more.";
    const url = `https://lorenzogm.com/${lang}/topics/`;

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
  component: TopicsPage,
});
