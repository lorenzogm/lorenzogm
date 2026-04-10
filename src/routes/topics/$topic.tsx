import { createFileRoute, Link } from "@tanstack/react-router";
import { BlogCard } from "@/components/patterns/blog-card";
import { getPostsByTopic } from "@/lib/blog";

function TopicPage() {
  const { topic, posts } = Route.useLoaderData();

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
          Posts about &ldquo;{topic}&rdquo;
        </h1>
        <p className="mt-2 text-gray-500">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
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

export const Route = createFileRoute("/topics/$topic")({
  loader: ({ params }) => {
    const topic = decodeURIComponent(params.topic);
    const posts = getPostsByTopic(topic, "en");
    return { topic, posts };
  },
  component: TopicPage,
});
