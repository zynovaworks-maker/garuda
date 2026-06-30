import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { MapPin, Clock, Trophy, Target } from "lucide-react";
import { leaderboardKorlap } from "@/lib/mock-data";
import { MapMock } from "@/components/MapMock";

export const Route = createFileRoute("/app/force")({ component: ForcePage });

const relawan = Array.from({length:8}).map((_,i)=>({
  nama: ["Andi","Rina","Budi","Sari","Dimas","Lia","Hendra","Maya"][i] + " " + ["Saputra","Wijaya","Pratama","Lestari"][i%4],
  wilayah: ["Tanjung Priok","Cilincing","Koja","Pademangan"][i%4],
  status: i%4===0 ? "Offline" : "Aktif",
  target: 80 + i*2,
  capai: 60 + i*4,
}));

function ForcePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white">GARUDA FORCE</h1>
        <p className="text-sm text-white/60">Manajemen korlap, relawan, dan operasi lapangan.</p>
      </div>

      <Tabs defaultValue="relawan">
        <TabsList className="bg-white/5 text-white">
          <TabsTrigger value="korlap">Korlap</TabsTrigger>
          <TabsTrigger value="relawan">Relawan</TabsTrigger>
          <TabsTrigger value="gps">GPS Attendance</TabsTrigger>
          <TabsTrigger value="aktivitas">Monitoring</TabsTrigger>
          <TabsTrigger value="tugas">Penugasan</TabsTrigger>
          <TabsTrigger value="target">Target Kinerja</TabsTrigger>
          <TabsTrigger value="rank">Ranking</TabsTrigger>
        </TabsList>

        <TabsContent value="korlap" className="mt-4"><KorlapCards /></TabsContent>
        <TabsContent value="relawan" className="mt-4"><RelawanCards /></TabsContent>
        <TabsContent value="gps" className="mt-4"><GPS /></TabsContent>
        <TabsContent value="aktivitas" className="mt-4"><Monitoring /></TabsContent>
        <TabsContent value="tugas" className="mt-4"><Tugas /></TabsContent>
        <TabsContent value="target" className="mt-4"><RelawanCards target /></TabsContent>
        <TabsContent value="rank" className="mt-4"><Ranking /></TabsContent>
      </Tabs>
    </div>
  );
}

function RelawanCards({ target }: { target?: boolean }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {relawan.map(r=>(
        <Card key={r.nama} className="glass-dark border-white/10 p-4 text-white">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10"><AvatarFallback className="bg-gold/20 text-gold">{r.nama[0]}</AvatarFallback></Avatar>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{r.nama}</div>
              <div className="text-[11px] text-white/60 flex items-center gap-1"><MapPin className="h-3 w-3" />{r.wilayah}</div>
            </div>
          </div>
          <Badge className={`mt-3 ${r.status==="Aktif"?"bg-teal/20 text-teal border border-teal/40":"bg-white/10 text-white/60 border border-white/20"}`}>● {r.status}</Badge>
          {target && (
            <div className="mt-3">
              <div className="flex justify-between text-xs"><span className="text-white/60">Target</span><span>{r.capai}/{r.target}</span></div>
              <Progress value={(r.capai/r.target)*100} className="mt-1 h-1.5" />
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

function KorlapCards() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {leaderboardKorlap.map(k=>(
        <Card key={k.nama} className="glass-dark border-white/10 p-4 text-white">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12"><AvatarFallback className="bg-gold text-gold-foreground font-bold">{k.nama.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-semibold">{k.nama}</div>
              <div className="text-xs text-white/60">Koordinator · {k.wilayah}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gold">{k.skor}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/50">Skor</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded bg-white/5 p-2 text-center"><div className="text-white/60">Tim</div><div className="font-bold">18</div></div>
            <div className="rounded bg-white/5 p-2 text-center"><div className="text-white/60">Kunjungan</div><div className="font-bold">{k.kunjungan}</div></div>
            <div className="rounded bg-white/5 p-2 text-center"><div className="text-white/60">Pendukung</div><div className="font-bold text-teal">+{(k.skor*4).toLocaleString("id-ID")}</div></div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function GPS() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <MapMock height={420} />
      <Card className="glass-dark border-white/10 p-4 text-white">
        <div className="text-sm font-semibold">Timeline Hari Ini</div>
        <div className="mt-3 space-y-3 text-sm">
          {[
            ["08:02","Andi check-in di Posko Tj. Priok"],
            ["09:15","Rina mulai kunjungan RT 04 Warakas"],
            ["10:40","Budi sosialisasi komunitas nelayan"],
            ["12:30","Sari istirahat (logged)"],
            ["13:55","Dimas check-in TPS 087"],
          ].map(([t,a])=>(
            <div key={a} className="flex gap-3">
              <div className="text-xs font-mono text-gold w-12 shrink-0">{t}</div>
              <div className="flex-1 text-xs text-white/80">{a}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Monitoring() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[
        { l:"Kunjungan hari ini", v:"1.284", i: Target },
        { l:"Sosialisasi minggu ini", v:"3.420", i: Trophy },
        { l:"Jam aktif rata-rata", v:"6.2 jam", i: Clock },
      ].map((s)=>(
        <Card key={s.l} className="glass-dark border-white/10 p-5 text-white">
          <s.i className="h-5 w-5 text-gold" />
          <div className="mt-3 text-3xl font-bold">{s.v}</div>
          <div className="text-xs text-white/60">{s.l}</div>
        </Card>
      ))}
    </div>
  );
}

function Tugas() {
  const tugas = [
    { korlap:"Budi S.", wilayah:"Tj. Priok RT 01-08", target:"800 rumah", deadline:"5 Jul", status:"Berjalan" },
    { korlap:"Siti A.", wilayah:"Cilincing RW 03", target:"Sosialisasi 6 majelis", deadline:"3 Jul", status:"Selesai" },
    { korlap:"Agus R.", wilayah:"Koja RT 09-15", target:"500 rumah", deadline:"7 Jul", status:"Tertunda" },
  ];
  const color: Record<string,string> = { "Berjalan":"bg-teal/20 text-teal border border-teal/40","Selesai":"bg-gold/20 text-gold border border-gold/40","Tertunda":"bg-orange/20 text-orange border border-orange/40" };
  return (
    <Card className="glass-dark border-white/10 p-4 text-white">
      <table className="w-full text-sm">
        <thead className="text-left text-xs text-white/50"><tr><th className="p-2">Korlap</th><th className="p-2">Wilayah</th><th className="p-2">Target</th><th className="p-2">Deadline</th><th className="p-2">Status</th></tr></thead>
        <tbody>{tugas.map(t=>(
          <tr key={t.korlap} className="border-t border-white/5"><td className="p-2 font-medium">{t.korlap}</td><td className="p-2">{t.wilayah}</td><td className="p-2">{t.target}</td><td className="p-2">{t.deadline}</td>
            <td className="p-2"><Badge className={color[t.status]}>{t.status}</Badge></td></tr>
        ))}</tbody>
      </table>
    </Card>
  );
}

function Ranking() {
  return (
    <Card className="glass-dark border-white/10 p-4 text-white">
      <table className="w-full text-sm">
        <thead className="text-left text-xs text-white/50"><tr><th className="p-2">#</th><th className="p-2">Relawan</th><th className="p-2">Wilayah</th><th className="p-2 text-right">Skor</th></tr></thead>
        <tbody>{leaderboardKorlap.map((k,i)=>(
          <tr key={k.nama} className="border-t border-white/5">
            <td className="p-2">{i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1}</td>
            <td className="p-2 font-medium">{k.nama}</td>
            <td className="p-2">{k.wilayah}</td>
            <td className="p-2 text-right font-bold text-gold">{k.skor}</td>
          </tr>
        ))}</tbody>
      </table>
    </Card>
  );
}
