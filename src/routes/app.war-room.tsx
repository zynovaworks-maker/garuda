import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "./app.index";

export const Route = createFileRoute("/app/war-room")({
  head: () => ({ meta: [{ title: "War Room — GARUDA" }] }),
  component: () => {
    // Reuse the dashboard layout as the war room
    const Comp = (Dashboard as any).options?.component ?? (() => null);
    return <Comp />;
  },
});
