import { createFileRoute, notFound, useParams } from "@tanstack/react-router";
import { ArticleDetailPage } from "@/components/pages/article-detail-page";
import { getPostBySlug, isPublished } from "@/lib/blog";
import { type Lang, t } from "@/lib/i18n";

function BlogPostPage() {
  const post = Route.useLoaderData();
  if (!isPublished(post.date)) {
    return <NotFoundComponent />;
  }
  return <ArticleDetailPage post={post} />;
}

function NotFoundComponent() {
  const { lang } = useParams({ from: "/$lang/blog/$slug" });
  const l = lang as Lang;
  return (
    <div className="py-16 text-center">
      <h1 className="mb-4 font-bold text-4xl text-gray-900">
        {t(l, "postNotFound")}
      </h1>
      <p className="mb-8 text-gray-600">{t(l, "postNotFoundMessage")}</p>
      <a
        className="font-semibold text-red-600 hover:text-red-700"
        href={`/${lang}`}
      >
        ← {t(l, "backToHome")}
      </a>
    </div>
  );
}

export const Route = createFileRoute("/$lang/blog/$slug")({
  loader: async ({ params }) => {
    const lang = params.lang as Lang;
    const post = await getPostBySlug(params.slug, lang);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const post = loaderData;
    const isEs = post.lang === "es";
    const url = `https://lorenzogm.com/${post.lang}/blog/${post.slug}`;
    const altLang = isEs ? "en" : "es";
    const altUrl = `https://lorenzogm.com/${altLang}/blog/${post.slug}`;

    return {
      meta: [
        { title: `${post.title} – Lorenzo GM` },
        { name: "description", content: post.excerpt },
        { name: "author", content: post.author },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: post.image },
        { property: "og:locale", content: isEs ? "es_ES" : "en_US" },
        { property: "article:published_time", content: post.date },
        { property: "article:author", content: post.author },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
        { name: "twitter:image", content: post.image },
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "alternate", hrefLang: post.lang, href: url },
        { rel: "alternate", hrefLang: altLang, href: altUrl },
      ],
    };
  },
  component: BlogPostPage,
  notFoundComponent: NotFoundComponent,
});
