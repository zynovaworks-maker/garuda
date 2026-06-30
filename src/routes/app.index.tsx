import { createFileRoute } from "@tanstack/react-router";
import { KPICard } from "@/components/KPICard";
import { MapMock } from "@/components/MapMock";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users, Vote, UserCheck, MapPin, Target, TrendingUp, Wallet, Trophy,
  AlertTriangle, ChevronRight,
} from "lucide-react";
import {
  KPI, elektabilitasTrend, aktivitasRelawan, targetSuaraDonut,
  wilayahPotensial, tpsRawan, leaderboardKorlap, transaksiKeuangan,
} from "@/lib/mock-data";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

const chartTooltip = {
  contentStyle: { background: "oklch(0.16 0.05 262)", border: "1px solid oklch(0.28 0.05 262)", borderRadius: 8, fontSize: 12 },
  labelStyle: { color: "oklch(0.96 0.01 240)" },
};

function Dashboard() {
  const totalPemasukan = transaksiKeuangan.filter(t=>t.tipe==="Pemasukan").reduce((s,t)=>s+t.jumlah,0);
  const totalPengeluaran = transaksiKeuangan.filter(t=>t.tipe==="Pengeluaran").reduce((s,t)=>s+t.jumlah,0);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold">Election Command Center</div>
          <h1 className="text-2xl font-bold text-white md:text-3xl">War Room — Live Overview</h1>
          <p className="mt-1 text-sm text-white/60">Update terakhir: 30 Jun 2026, 09:42 WIB · Sumber: 4.812 relawan, 3.240 TPS</p>
        </div>
        <Badge className="bg-teal/20 text-teal border border-teal/40">● Real-time</Badge>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard label="Total Pemilih" value={KPI.totalPemilih.toLocaleString("id-ID")} hint="DPT terverifikasi" icon={<Vote className="h-4 w-4" />} accent="gold" />
        <KPICard label="Total Pendukung" value={KPI.totalPendukung.toLocaleString("id-ID")} trend="+8.2% wow" icon={<Users className="h-4 w-4" />} accent="teal" />
        <KPICard label="Relawan Aktif" value={KPI.relawanAktif.toLocaleString("id-ID")} hint="dari 5.200 terdaftar" icon={<UserCheck className="h-4 w-4" />} accent="orange" />
        <KPICard label="Jumlah TPS" value={KPI.jumlahTPS.toLocaleString("id-ID")} hint="92% terpantau" icon={<MapPin className="h-4 w-4" />} accent="blue" />
        <KPICard label="Target Suara" value={KPI.targetSuara.toLocaleString("id-ID")} hint="ambang menang" icon={<Target className="h-4 w-4" />} accent="gold" />
        <KPICard label="Progress Target" value={`${KPI.progressTarget}%`} trend="on track" icon={<TrendingUp className="h-4 w-4" />} accent="teal" />
        <KPICard label="Dana Terpakai" value={`Rp ${KPI.danaTerpakai} M`} hint="dari Rp 8 M" icon={<Wallet className="h-4 w-4" />} accent="orange" />
        <KPICard label="Prediksi Kemenangan" value={`${KPI.prediksiKemenangan}%`} trend="convidence 92%" icon={<Trophy className="h-4 w-4" />} accent="blue" />
      </div>

      {/* Map + Donut */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PanelHeader title="Peta Dukungan & TPS" subtitle="GARUDA MAP · Heatmap real-time" />
          <MapMock height={380} />
        </div>
        <Card className="glass-dark border-white/10 p-5 text-white">
          <PanelHeader title="Progress Target Suara" subtitle={`${KPI.progressTarget}% dari target ${KPI.targetSuara.toLocaleString("id-ID")}`} compact />
          <div className="relative h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={targetSuaraDonut} dataKey="value" innerRadius={62} outerRadius={92} paddingAngle={2}>
                  {targetSuaraDonut.map((d, i) => <Cell key={i} fill={d.fill} />)}
                </Pie>
                <Tooltip {...chartTooltip} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-gold">{KPI.progressTarget}%</div>
              <div className="text-xs text-white/60">Tercapai</div>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-white/60">Tercapai</span><span className="font-semibold text-gold">612.402</span></div>
            <div className="flex justify-between"><span className="text-white/60">Sisa target</span><span className="font-semibold">107.598</span></div>
            <div className="flex justify-between"><span className="text-white/60">Estimasi finish</span><span className="font-semibold text-teal">14 hari lagi</span></div>
          </div>
        </Card>
      </div>

      {/* Trend + Aktivitas */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="glass-dark border-white/10 p-5 text-white">
          <PanelHeader title="Trend Elektabilitas" subtitle="Survey internal mingguan vs lawan" compact />
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={elektabilitasTrend}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" strokeDasharray="3 3" />
                <XAxis dataKey="bulan" stroke="oklch(1 0 0 / 0.5)" fontSize={11} />
                <YAxis stroke="oklch(1 0 0 / 0.5)" fontSize={11} />
                <Tooltip {...chartTooltip} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="kandidat" name="Kandidat" stroke="var(--color-gold)" strokeWidth={3} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="lawan1" name="Lawan A" stroke="var(--color-teal)" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="lawan2" name="Lawan B" stroke="var(--color-orange)" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass-dark border-white/10 p-5 text-white">
          <PanelHeader title="Aktivitas Relawan (7 hari)" subtitle="Kunjungan vs sosialisasi" compact />
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={aktivitasRelawan}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" strokeDasharray="3 3" />
                <XAxis dataKey="hari" stroke="oklch(1 0 0 / 0.5)" fontSize={11} />
                <YAxis stroke="oklch(1 0 0 / 0.5)" fontSize={11} />
                <Tooltip {...chartTooltip} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="kunjungan" name="Kunjungan DPR" fill="var(--color-gold)" radius={[6,6,0,0]} />
                <Bar dataKey="sosialisasi" name="Sosialisasi" fill="var(--color-teal)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Finance / wilayah / TPS rawan / leaderboard */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="glass-dark border-white/10 p-5 text-white">
          <PanelHeader title="Ringkasan Keuangan" compact />
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-teal/10 p-3">
              <div className="text-[10px] uppercase tracking-wider text-white/60">Pemasukan</div>
              <div className="mt-1 text-lg font-bold text-teal">Rp {(totalPemasukan/1e6).toFixed(0)} Jt</div>
            </div>
            <div className="rounded-lg bg-orange/10 p-3">
              <div className="text-[10px] uppercase tracking-wider text-white/60">Pengeluaran</div>
              <div className="mt-1 text-lg font-bold text-orange">Rp {(totalPengeluaran/1e6).toFixed(0)} Jt</div>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-xs">
            {["Operasional","Logistik","Program Wilayah"].map((k,i)=>(
              <div key={k}>
                <div className="flex justify-between"><span className="text-white/60">{k}</span><span className="font-medium">{[42,28,18][i]}%</span></div>
                <Progress value={[42,28,18][i]} className="h-1.5 mt-1" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-dark border-white/10 p-5 text-white">
          <PanelHeader title="Top Wilayah Potensial" compact />
          <div className="space-y-2">
            {wilayahPotensial.map((w, i) => (
              <div key={w.nama} className="flex items-center gap-3 rounded-lg bg-white/5 p-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">{i+1}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{w.nama}</div>
                  <div className="text-[11px] text-white/50">{w.pendukung.toLocaleString("id-ID")} pendukung · {w.tps} TPS</div>
                </div>
                <Badge className="bg-teal/20 text-teal border border-teal/40 shrink-0">{w.potensi}%</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-dark border-white/10 p-5 text-white">
          <PanelHeader title="TPS Perlu Perhatian" compact />
          <div className="space-y-2">
            {tpsRawan.map(t => (
              <div key={t.tps} className="flex gap-3 rounded-lg border border-orange/20 bg-orange/5 p-3">
                <AlertTriangle className="h-4 w-4 shrink-0 text-orange" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{t.tps}</div>
                  <div className="text-[11px] text-white/60">{t.isu}</div>
                </div>
                <Badge variant="outline" className="shrink-0 border-orange/40 text-orange text-[10px]">{t.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card className="glass-dark border-white/10 p-5 text-white">
        <PanelHeader title="Leaderboard Korlap" subtitle="Skor berdasarkan kunjungan, perekrutan, dan akurasi data" compact />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-white/50">
              <tr><th className="p-2">#</th><th className="p-2">Korlap</th><th className="p-2">Wilayah</th><th className="p-2">Kunjungan</th><th className="p-2 text-right">Skor</th></tr>
            </thead>
            <tbody>
              {leaderboardKorlap.map((k, i) => (
                <tr key={k.nama} className="border-t border-white/5">
                  <td className="p-2 text-white/50">{i+1}</td>
                  <td className="p-2 font-medium">{k.nama}</td>
                  <td className="p-2 text-white/70">{k.wilayah}</td>
                  <td className="p-2 text-white/70">{k.kunjungan}</td>
                  <td className="p-2 text-right">
                    <span className="rounded-full bg-gold/10 px-2 py-0.5 font-semibold text-gold">{k.skor}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function PanelHeader({ title, subtitle, compact }: { title: string; subtitle?: string; compact?: boolean }) {
  return (
    <div className={compact ? "mb-3" : "mb-3"}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-base font-bold text-white">{title}</h3>
        <ChevronRight className="h-4 w-4 text-white/30" />
      </div>
      {subtitle && <div className="text-xs text-white/50">{subtitle}</div>}
    </div>
  );
}
