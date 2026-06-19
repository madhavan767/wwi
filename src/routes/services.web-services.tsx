import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services/web-services")({
  beforeLoad: () => {
    throw redirect({ to: "/services/web" });
  },
});
