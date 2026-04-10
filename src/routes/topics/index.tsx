import { createFileRoute } from "@tanstack/react-router";
import { TopicCloud } from "@/components/patterns/topic-cloud";
import { getTopicCounts } from "@/lib/blog";

function TopicsPage() {
  const { topics } = Route.useLoaderData();

  return (
    <>
      <div className="mb-8">
        <h1 className="font-bold text-3xl text-gray-900">Topics</h1>
        <p className="mt-2 text-gray-500">Browse all {topics.length} topics</p>
      </div>

      <TopicCloud topics={topics} />
    </>
  );
}

export const Route = createFileRoute("/topics/")({
  loader: () => ({ topics: getTopicCounts("en") }),
  component: TopicsPage,
});
