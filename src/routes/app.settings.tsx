import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/app/settings")({ component: SettingsPage });

function SettingsPage() {
  return (
    <div className="space-y-4">
      <div><h1 className="text-2xl font-bold text-white">Settings</h1><p className="text-sm text-white/60">Preferensi campaign dan akun.</p></div>
      <Card className="glass-dark border-white/10 p-5 text-white">
        <div className="font-semibold">Profil Campaign</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div><Label>Nama Campaign</Label><Input defaultValue="Kampanye Suryanto 2026" className="bg-white/5 border-white/10"/></div>
          <div><Label>Tahun Pemilihan</Label><Input defaultValue="2026" className="bg-white/5 border-white/10"/></div>
        </div>
      </Card>
      <Card className="glass-dark border-white/10 p-5 text-white">
        <div className="font-semibold">Preferensi</div>
        <div className="mt-3 space-y-3 text-sm">
          {["Notifikasi real-time","Mode hemat data lapangan","Auto-sync GPS relawan","Email digest harian"].map(p=>(
            <div key={p} className="flex items-center justify-between"><span>{p}</span><Switch defaultChecked /></div>
          ))}
        </div>
      </Card>
      <Button onClick={()=>toast.success("Pengaturan disimpan")} className="bg-gold text-gold-foreground">Simpan</Button>
    </div>
  );
}
