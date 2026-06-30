import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Map, Vote, Users, Wallet, ShieldCheck, Radar,
  FileBarChart, Settings, LogOut, Menu, X, ChevronRight,
} from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/map", label: "GARUDA MAP", icon: Map },
  { to: "/app/vote", label: "GARUDA VOTE", icon: Vote },
  { to: "/app/force", label: "GARUDA FORCE", icon: Users },
  { to: "/app/fund", label: "GARUDA FUND", icon: Wallet },
  { to: "/app/verify", label: "GARUDA VERIFY", icon: ShieldCheck },
  { to: "/app/war-room", label: "War Room", icon: Radar },
  { to: "/app/report", label: "Report", icon: FileBarChart },
  { to: "/app/admin", label: "Admin", icon: Settings },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function AppSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5 text-sidebar-foreground">
          <Logo className="text-sidebar-foreground" />
          <button onClick={onClose} className="lg:hidden text-sidebar-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to, item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-gradient-to-r from-[oklch(0.78_0.14_80/0.18)] to-transparent text-gold border-l-2 border-gold"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
                {active && <ChevronRight className="ml-auto h-3.5 w-3.5" />}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={() => { try { localStorage.removeItem("garuda_session"); } catch {}; navigate({ to: "/login" }); }}
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-foreground lg:hidden">
      <Menu className="h-5 w-5" />
    </button>
  );
}

export function useSidebar() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}
