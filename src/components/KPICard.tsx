import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function KPICard({
  label, value, hint, trend, icon, accent = "gold",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  trend?: string;
  icon?: ReactNode;
  accent?: "gold" | "teal" | "orange" | "blue";
}) {
  const accents = {
    gold: "from-[oklch(0.78_0.14_80/0.25)] to-transparent text-gold",
    teal: "from-[oklch(0.65_0.12_180/0.25)] to-transparent text-teal",
    orange: "from-[oklch(0.72_0.18_50/0.25)] to-transparent text-orange",
    blue: "from-[oklch(0.55_0.18_260/0.25)] to-transparent text-[oklch(0.7_0.18_260)]",
  };
  return (
    <div className="glass-dark relative overflow-hidden rounded-xl p-4 shadow-premium">
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", accents[accent])} />
      <div className="relative">
        <div className="flex items-start justify-between">
          <span className="text-xs uppercase tracking-wider text-white/60">{label}</span>
          {icon && <div className={cn("rounded-lg p-1.5", accents[accent].split(" ").slice(-1)[0])}>{icon}</div>}
        </div>
        <div className="mt-3 text-2xl font-bold text-white">{value}</div>
        <div className="mt-1 flex items-center gap-2 text-xs">
          {hint && <span className="text-white/50">{hint}</span>}
          {trend && <span className="font-medium text-teal">{trend}</span>}
        </div>
      </div>
    </div>
  );
}
