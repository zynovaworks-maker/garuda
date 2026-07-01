import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapMock } from "@/components/MapMock";
import { PanelHeader } from "./app.index";
import {
  KPI,
  aktivitasRelawan,
  tpsRawan,
  verifikasiTPS,
  wilayahPotensial,
} from "@/lib/mock-data";
import { getCampaignSetup, getElectionMeta, getPackageMeta, getStrategyMeta } from "@/lib/campaign-setup";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  MapPinned,
  Radio,
  Radar,
  ShieldAlert,
  Siren,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/app/war-room")({
  head: () => ({ meta: [{ title: "War Room - GARUDA" }] }),
  component: WarRoomPage,
});

const chartTooltip = {
  contentStyle: { background: "oklch(0.16 0.05 262)", border: "1px solid oklch(0.28 0.05 262)", borderRadius: 8, fontSize: 12 },
  labelStyle: { color: "oklch(0.96 0.01 240)" },
};

const prediction = [
  { jam: "08:00", menang: 54, risiko: 31 },
  { jam: "10:00", menang: 57, risiko: 28 },
  { jam: "12:00", menang: 60, risiko: 25 },
  { jam: "14:00", menang: 62, risiko: 21 },
  { jam: "16:00", menang: 64, risiko: 19 },
];

const missionQueue = [
  { title: "Lengkapi saksi TPS rawan", region: "Warakas dan Marunda", owner: "Tim Saksi", status: "Prioritas" },
  { title: "Dorong turnout pendukung", region: "Tanjung Priok RT 01-08", owner: "Korlap Utara", status: "Berjalan" },
  { title: "Validasi ulang C1 perlu review", region: "12 TPS", owner: "Verifikator", status: "Review" },
  { title: "Distribusi logistik cadangan", region: "Cilincing", owner: "Operasional", status: "Siap" },
];

function WarRoomPage() {
  const setup = getCampaignSetup();
  const election = getElectionMeta(setup.election);
  const pkg = getPackageMeta(setup.pkg);
  const strategy = getStrategyMeta(setup.strategy);
  const verified = verifikasiTPS.filter((item) => item.status === "Terverifikasi").length;
  const review = verifikasiTPS.filter((item) => item.status === "Perlu Review" || item.status === "Menunggu").length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-orange/20 text-orange border border-orange/40">
              <Radio className="mr-1 h-3.5 w-3.5" /> Command Center Live
            </Badge>
            <Badge variant="outline" className="border-white/20 text-white/70">{election.nama}</Badge>
            <Badge variant="outline" className="border-white/20 text-white/70">{pkg.nama}</Badge>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-white md:text-3xl">GARUDA WAR ROOM</h1>
          <p className="text-sm text-white/60">
            {setup.nama} · Kandidat {setup.kandidat} · Strategi {strategy.nama}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="border-white/20" onClick={() => toast.info("Briefing darurat dikirim ke korlap prioritas")}>
            <Radio className="mr-1 h-4 w-4" /> Briefing
          </Button>
          <Button className="bg-gold text-gold-foreground hover:bg-gold/90" onClick={() => toast.success("Instruksi lapangan dipublikasikan")}>
            <Siren className="mr-1 h-4 w-4" /> Kirim Instruksi
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <CommandMetric icon={Trophy} label="Prediksi Menang" value={`${KPI.prediksiKemenangan}%`} tone="gold" />
        <CommandMetric icon={Target} label="Progress Target" value={`${KPI.progressTarget}%`} tone="teal" />
        <CommandMetric icon={Users} label="Relawan Aktif" value={KPI.relawanAktif.toLocaleString("id-ID")} tone="orange" />
        <CommandMetric icon={ClipboardCheck} label="C1 Terverifikasi" value={`${verified}/${verifikasiTPS.length}`} tone="teal" />
        <CommandMetric icon={ShieldAlert} label="Perlu Eskalasi" value={`${tpsRawan.length + review} titik`} tone="orange" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          <PanelHeader title="Peta Kemenangan" subtitle="Monitoring TPS, relawan, wilayah, dan anomali" />
          <MapMock height={520} />
        </div>

        <Card className="glass-dark border-white/10 p-5 text-white">
          <PanelHeader title="Executive Dashboard" subtitle="Sinyal utama untuk keputusan cepat" compact />
          <div className="space-y-4">
            {[
              ["Suara aman", KPI.totalPendukung, KPI.targetSuara],
              ["TPS terpantau", 2981, KPI.jumlahTPS],
              ["Verifikasi C1", verified, verifikasiTPS.length],
            ].map(([label, value, total]) => (
              <div key={label as string}>
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">{label}</span>
                  <span className="font-semibold">{Number(value).toLocaleString("id-ID")} / {Number(total).toLocaleString("id-ID")}</span>
                </div>
                <Progress value={(Number(value) / Number(total)) * 100} className="mt-1.5 h-2" />
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-orange/30 bg-orange/10 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-orange">
              <AlertTriangle className="h-4 w-4" /> Decision Alert
            </div>
            <p className="mt-1 text-xs text-white/70">
              Tambahkan 24 saksi cadangan di TPS rawan tinggi dan geser relawan door-to-door ke 3 wilayah swing voter sebelum pukul 16:00.
            </p>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="glass-dark border-white/10 p-5 text-white lg:col-span-2">
          <PanelHeader title="Prediksi Kemenangan" subtitle="Model berbasis tren suara, C1, dan aktivitas lapangan" compact />
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={prediction}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" strokeDasharray="3 3" />
                <XAxis dataKey="jam" stroke="oklch(1 0 0 / 0.5)" fontSize={11} />
                <YAxis stroke="oklch(1 0 0 / 0.5)" fontSize={11} />
                <Tooltip {...chartTooltip} />
                <Line type="monotone" dataKey="menang" name="Peluang menang" stroke="var(--color-gold)" strokeWidth={3} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="risiko" name="Risiko sengketa" stroke="var(--color-orange)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass-dark border-white/10 p-5 text-white">
          <PanelHeader title="Misi Lapangan" subtitle="Queue tindakan yang belum selesai" compact />
          <div className="space-y-2">
            {missionQueue.map((item) => (
              <div key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-medium">{item.title}</div>
                  <Badge className={item.status === "Prioritas" ? "bg-orange/20 text-orange border border-orange/40" : "bg-teal/20 text-teal border border-teal/40"}>{item.status}</Badge>
                </div>
                <div className="mt-1 text-xs text-white/55">{item.region} · {item.owner}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="glass-dark border-white/10 p-5 text-white">
          <PanelHeader title="Monitoring Relawan" subtitle="Aktivitas lapangan 7 hari terakhir" compact />
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={aktivitasRelawan}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" strokeDasharray="3 3" />
                <XAxis dataKey="hari" stroke="oklch(1 0 0 / 0.5)" fontSize={11} />
                <YAxis stroke="oklch(1 0 0 / 0.5)" fontSize={11} />
                <Tooltip {...chartTooltip} />
                <Bar dataKey="kunjungan" fill="var(--color-gold)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="sosialisasi" fill="var(--color-teal)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass-dark border-white/10 p-5 text-white">
          <PanelHeader title="Monitoring Wilayah" subtitle="Top wilayah dan titik rawan" compact />
          <div className="space-y-2">
            {wilayahPotensial.slice(0, 4).map((item) => (
              <div key={item.nama} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                <MapPinned className="h-4 w-4 text-teal" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{item.nama}</div>
                  <div className="text-xs text-white/55">{item.pendukung.toLocaleString("id-ID")} pendukung · {item.tps} TPS</div>
                </div>
                <Badge className="bg-gold/20 text-gold border border-gold/40">{item.potensi}%</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function CommandMetric({ icon: Icon, label, value, tone }: { icon: typeof Radar; label: string; value: string; tone: "gold" | "teal" | "orange" }) {
  const classes = {
    gold: "bg-gold/20 text-gold",
    teal: "bg-teal/20 text-teal",
    orange: "bg-orange/20 text-orange",
  };

  return (
    <Card className="glass-dark border-white/10 p-4 text-white">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${classes[tone]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
      <div className="text-xs text-white/55">{label}</div>
      <div className="mt-2 flex items-center gap-1 text-[11px] text-teal">
        <CheckCircle2 className="h-3 w-3" /> live
      </div>
    </Card>
  );
}
