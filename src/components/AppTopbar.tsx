import { Bell, Search, Calendar, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileMenuButton } from "./AppSidebar";
import { useEffect, useState } from "react";
import { getCampaignSetup, type CampaignSetup } from "@/lib/campaign-setup";

export function AppTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [campaign, setCampaign] = useState("Kampanye Suryanto 2026");
  const [campaignSetup, setCampaignSetup] = useState<CampaignSetup | null>(null);
  const [region, setRegion] = useState("Seluruh Wilayah");
  const [range, setRange] = useState("30 Hari Terakhir");
  const [session, setSession] = useState<{ email: string; role: string } | null>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem("garuda_session");
      if (s) setSession(JSON.parse(s));
      const setup = getCampaignSetup();
      setCampaignSetup(setup);
      setCampaign(setup.nama);
    } catch {}

    const onSetup = (event: Event) => {
      const next = (event as CustomEvent<CampaignSetup>).detail ?? getCampaignSetup();
      setCampaignSetup(next);
      setCampaign(next.nama);
    };
    window.addEventListener("garuda:campaign-setup", onSetup);
    window.addEventListener("storage", onSetup);
    return () => {
      window.removeEventListener("garuda:campaign-setup", onSetup);
      window.removeEventListener("storage", onSetup);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-md lg:px-6">
      <MobileMenuButton onClick={onMenuClick} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 max-w-[200px] truncate">
            <span className="hidden sm:inline text-xs text-muted-foreground">Campaign</span>
            <span className="truncate font-medium">{campaign}</span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Pilih Campaign</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {[campaignSetup?.nama ?? "Kampanye Suryanto 2026", "Pilkada Kab. Bekasi 2027", "Pileg Dapil DKI III"].map((c) => (
            <DropdownMenuItem key={c} onClick={() => setCampaign(c)}>{c}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="hidden md:inline-flex gap-2">
            <MapPin className="h-4 w-4 text-teal" /> {region} <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {["Seluruh Wilayah","Jakarta Utara","Jakarta Pusat","Jakarta Barat","Jakarta Selatan","Jakarta Timur"].map(r=>(
            <DropdownMenuItem key={r} onClick={()=>setRegion(r)}>{r}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="hidden md:inline-flex gap-2">
            <Calendar className="h-4 w-4 text-orange" /> {range} <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {["7 Hari Terakhir","30 Hari Terakhir","90 Hari Terakhir","Sejak Kampanye Dimulai"].map(r=>(
            <DropdownMenuItem key={r} onClick={()=>setRange(r)}>{r}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Cari pemilih, TPS, relawan..."
            className="h-9 w-64 rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full pl-1 pr-2 hover:bg-accent">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gold text-gold-foreground text-xs font-semibold">
                  {(session?.email?.[0] ?? "S").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left sm:block">
                <div className="text-xs font-semibold leading-tight">{session?.role ?? "Super Admin"}</div>
                <div className="text-[10px] text-muted-foreground leading-tight truncate max-w-[120px]">{session?.email ?? "demo@garuda.id"}</div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Akun</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Preferensi</DropdownMenuItem>
            <DropdownMenuItem>Bantuan</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
