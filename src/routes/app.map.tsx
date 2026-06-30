import { createFileRoute } from "@tanstack/react-router";
import { MapMock } from "@/components/MapMock";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Layers, MapPin, TrendingUp } from "lucide-react";
import { wilayahPotensial } from "@/lib/mock-data";
import { useState } from "react";
import { toast } from "sonner";
import { PanelHeader } from "./app.index";

export const Route = createFileRoute("/app/map")({ component: MapPage });

const layers = [
  { id: "admin", nama: "Peta Wilayah Administratif" },
  { id: "tps", nama: "Peta TPS" },
  { id: "heat", nama: "Heatmap Dukungan" },
  { id: "roi", nama: "Heatmap ROI Kampanye" },
  { id: "rel", nama: "Pemetaan Relawan" },
  { id: "titik", nama: "Titik Pendukung" },
];

function MapPage() {
  const [active, setActive] = useState<Record<string, boolean>>({ admin: true, tps: true, heat: true, roi: false, rel: false, titik: false });
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">GARUDA MAP</h1>
          <p className="text-sm text-white/60">GIS campaign intelligence · 3.240 TPS · 4.812 relawan</p>
        </div>
        <Button onClick={() => toast.success("GeoJSON berhasil diimport (mock)")} className="bg-gold text-gold-foreground hover:bg-gold/90">
          <Upload className="mr-1 h-4 w-4" /> Import GeoJSON
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[260px_1fr_280px]">
        <Card className="glass-dark border-white/10 p-4 text-white">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Layers className="h-4 w-4 text-gold" /> Layer Map</div>
          <div className="space-y-3">
            {layers.map(l => (
              <div key={l.id} className="flex items-center justify-between gap-2">
                <Label htmlFor={l.id} className="text-xs text-white/80">{l.nama}</Label>
                <Switch id={l.id} checked={active[l.id]} onCheckedChange={(v) => setActive({ ...active, [l.id]: v })} />
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2">
            <Label className="text-xs">Filter Wilayah</Label>
            {["Provinsi","Kabupaten/Kota","Kecamatan","Desa/Kelurahan","TPS"].map(f=>(
              <Select key={f}>
                <SelectTrigger className="h-9 text-xs"><SelectValue placeholder={f} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua {f}</SelectItem>
                  <SelectItem value="a">{f} Contoh 1</SelectItem>
                  <SelectItem value="b">{f} Contoh 2</SelectItem>
                </SelectContent>
              </Select>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <MapMock height={520} />
          <div className="grid gap-3 sm:grid-cols-3">
            {wilayahPotensial.slice(0, 3).map(w => (
              <Card key={w.nama} className="glass-dark border-white/10 p-4 text-white">
                <div className="flex items-center gap-2 text-xs text-white/60"><MapPin className="h-3.5 w-3.5 text-teal" /> {w.nama}</div>
                <div className="mt-2 text-2xl font-bold text-gold">{w.potensi}%</div>
                <div className="text-[11px] text-white/50">Kekuatan dukungan</div>
                <div className="mt-2 flex items-center gap-1 text-[11px] text-teal"><TrendingUp className="h-3 w-3" /> +4.2% mom</div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="glass-dark border-white/10 p-4 text-white">
          <PanelHeader title="Detail Wilayah" subtitle="Kec. Tanjung Priok" compact />
          <div className="space-y-2 text-sm">
            {[
              ["Total DPT", "184.230"],
              ["Pendukung", "48.200"],
              ["Swing voter", "23.100"],
              ["TPS terpantau", "184 / 184"],
              ["Relawan aktif", "62"],
              ["ROI kampanye", "Rp 1.240 / suara"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded-lg bg-white/5 p-2">
                <span className="text-white/60">{k}</span><span className="font-semibold">{v}</span>
              </div>
            ))}
          </div>
          <Badge className="mt-4 w-full justify-center bg-teal/20 text-teal border border-teal/40">Status: Strong Hold</Badge>
        </Card>
      </div>
    </div>
  );
}
