import { createFileRoute, notFound, useParams } from "@tanstack/react-router";
import { ArticleDetailPage } from "@/components/pages/article-detail-page";
import { getPostBySlug } from "@/lib/blog";
import { type Lang, t } from "@/lib/i18n";

function BlogPostPage() {
  const post = Route.useLoaderData();
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
  component: BlogPostPage,
  notFoundComponent: NotFoundComponent,
});
