import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/app/war-room")({
  head: () => ({ meta: [{ title: "War Room — GARUDA" }] }),
  component: () => <Navigate to="/app" replace />,
});
