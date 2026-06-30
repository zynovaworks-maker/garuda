import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { AppTopbar } from "@/components/AppTopbar";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [{ title: "Dashboard — GARUDA" }] }),
  component: AppLayout,
});

function AppLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Soft demo guard
    try {
      const s = localStorage.getItem("garuda_session");
      if (!s) {
        // create implicit demo session so deep links still work
        localStorage.setItem("garuda_session", JSON.stringify({ email: "demo@garuda.id", role: "Super Admin", ts: Date.now() }));
      }
    } catch {}
  }, [navigate]);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <AppSidebar open={open} onClose={() => setOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col bg-dashboard">
          <AppTopbar onMenuClick={() => setOpen(true)} />
          <main className="flex-1 overflow-x-hidden p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
