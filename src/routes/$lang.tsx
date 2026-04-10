import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { isValidLang } from "@/lib/i18n";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isValidLang(params.lang)) {
      throw notFound();
    }
  },
  component: () => <Outlet />,
});
