import { cn } from "@/lib/utils";

export function Logo({ className, variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  const stroke = variant === "dark" ? "currentColor" : "currentColor";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative">
        <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.14 85)" />
              <stop offset="100%" stopColor="oklch(0.65 0.16 55)" />
            </linearGradient>
          </defs>
          {/* Shield */}
          <path d="M20 2 L36 8 V20 C36 30 28 36 20 38 C12 36 4 30 4 20 V8 Z" fill="url(#g-gold)" opacity="0.15" stroke="url(#g-gold)" strokeWidth="1.5" />
          {/* Eagle wings stylized */}
          <path d="M10 16 L20 12 L30 16 L26 18 L20 16 L14 18 Z" fill="url(#g-gold)" />
          {/* Map pin body */}
          <path d="M20 14 C22.5 14 24.5 16 24.5 18.5 C24.5 22 20 28 20 28 C20 28 15.5 22 15.5 18.5 C15.5 16 17.5 14 20 14 Z" fill="url(#g-gold)" />
          <circle cx="20" cy="18.5" r="1.6" fill="oklch(0.14 0.06 265)" />
          {/* Growth chart */}
          <path d="M12 32 L16 28 L20 30 L24 25 L28 27" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight">GARUDA</span>
        <span className="text-[10px] uppercase tracking-[0.18em] opacity-70">Intelijen Kampanye</span>
      </div>
    </div>
  );
}
