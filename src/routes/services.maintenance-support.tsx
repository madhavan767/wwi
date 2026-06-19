import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services/maintenance-support")({
  beforeLoad: () => {
    throw redirect({ to: "/services/maintenance" });
  },
});
