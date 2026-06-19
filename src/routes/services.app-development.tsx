import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services/app-development")({
  beforeLoad: () => {
    throw redirect({ to: "/services/app" });
  },
});
