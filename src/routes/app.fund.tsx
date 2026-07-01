import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { transaksiKeuangan, donatur, kontrakSuara } from "@/lib/mock-data";
import { ArrowDown, ArrowUp, Wallet, CheckCircle, Clock, XCircle, Heart, FileSignature } from "lucide-react";
import { toast } from "sonner";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";

export const Route = createFileRoute("/app/fund")({ component: FundPage });

const trendKeuangan = [
  { bulan:"Jan", in:600, out:420 },{ bulan:"Feb", in:820, out:560 },
  { bulan:"Mar", in:740, out:680 },{ bulan:"Apr", in:920, out:780 },
  { bulan:"Mei", in:1100, out:910 },{ bulan:"Jun", in:1280, out:1040 },
];

const roiWilayah = [
  { w:"Tj. Priok", roi:1240 },{ w:"Cilincing", roi:1480 },
  { w:"Koja", roi:1620 },{ w:"Pademangan", roi:1980 },{ w:"K.Gading", roi:2210 },
];

const chartTooltip = {
  contentStyle: { background: "oklch(0.16 0.05 262)", border: "1px solid oklch(0.28 0.05 262)", borderRadius: 8, fontSize: 12 },
};

function FundPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">GARUDA FUND</h1>
          <p className="text-sm text-white/60">Intelijen keuangan kampanye · transparan & auditable.</p>
        </div>
        <Badge className="bg-teal/20 text-teal border border-teal/40">Compliance OK</Badge>
      </div>

      <Tabs defaultValue="dash">
        <TabsList className="bg-white/5 text-white flex-wrap h-auto">
          <TabsTrigger value="dash">Dashboard</TabsTrigger>
          <TabsTrigger value="trx">Pemasukan & Pengeluaran</TabsTrigger>
          <TabsTrigger value="donatur">Donatur & Sponsor</TabsTrigger>
          <TabsTrigger value="mutasi">Mutasi Dana</TabsTrigger>
          <TabsTrigger value="kontrak">Kontrak Suara</TabsTrigger>
          <TabsTrigger value="approval">Approval Pencairan</TabsTrigger>
          <TabsTrigger value="roi">Heatmap ROI</TabsTrigger>
          <TabsTrigger value="laporan">Laporan</TabsTrigger>
        </TabsList>

        <TabsContent value="dash" className="mt-4"><Dashboard /></TabsContent>
        <TabsContent value="trx" className="mt-4"><TransaksiTable /></TabsContent>
        <TabsContent value="donatur" className="mt-4"><DonaturList /></TabsContent>
        <TabsContent value="mutasi" className="mt-4"><TransaksiTable /></TabsContent>
        <TabsContent value="kontrak" className="mt-4"><KontrakSuara /></TabsContent>
        <TabsContent value="approval" className="mt-4"><Approval /></TabsContent>
        <TabsContent value="roi" className="mt-4"><ROIChart /></TabsContent>
        <TabsContent value="laporan" className="mt-4"><Laporan /></TabsContent>
      </Tabs>
    </div>
  );
}

function KontrakSuara() {
  const color: Record<string, string> = {
    "On Track": "bg-teal/20 text-teal border border-teal/40",
    "Perlu Dorongan": "bg-orange/20 text-orange border border-orange/40",
    "At Risk": "bg-destructive/20 text-destructive border border-destructive/40",
  };

  return (
    <Card className="glass-dark border-white/10 p-4 text-white">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold"><FileSignature className="h-4 w-4 text-gold" /> Kontrak Suara Wilayah</div>
          <div className="text-xs text-white/60">Menghubungkan target suara, penanggung jawab, dan anggaran per wilayah.</div>
        </div>
        <Button size="sm" className="bg-gold text-gold-foreground" onClick={() => toast.success("Kontrak suara baru dibuat")}>Tambah Kontrak</Button>
      </div>
      <div className="space-y-3">
        {kontrakSuara.map((item) => {
          const progress = Math.round((item.aktual / item.target) * 100);
          const costPerVote = Math.round(item.anggaran / Math.max(item.aktual, 1));
          return (
            <div key={item.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{item.wilayah}</div>
                  <div className="text-xs text-white/55">{item.id} · PJ {item.penanggungJawab} · ROI Rp {costPerVote.toLocaleString("id-ID")} / suara</div>
                </div>
                <Badge className={color[item.status]}>{item.status}</Badge>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Realisasi suara</span>
                  <span className="font-medium">{item.aktual.toLocaleString("id-ID")} / {item.target.toLocaleString("id-ID")} ({progress}%)</span>
                </div>
                <Progress value={progress} className="mt-1.5 h-2" />
              </div>
              <div className="mt-3 grid gap-2 text-xs sm:grid-cols-3">
                <div className="rounded bg-white/5 p-2"><span className="text-white/50">Anggaran</span><div className="font-semibold text-gold">Rp {(item.anggaran / 1e6).toFixed(0)} Jt</div></div>
                <div className="rounded bg-white/5 p-2"><span className="text-white/50">Sisa target</span><div className="font-semibold">{(item.target - item.aktual).toLocaleString("id-ID")}</div></div>
                <div className="rounded bg-white/5 p-2"><span className="text-white/50">Aksi</span><div className="font-semibold text-teal">Kirim ke Force</div></div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="glass-dark border-white/10 p-5 text-white">
          <div className="flex items-center gap-2 text-xs text-white/60"><ArrowDown className="h-3.5 w-3.5 text-teal" />Pemasukan</div>
          <div className="mt-2 text-3xl font-bold text-teal">Rp 5.460 Jt</div>
          <div className="text-xs text-white/50">+12% MoM</div>
        </Card>
        <Card className="glass-dark border-white/10 p-5 text-white">
          <div className="flex items-center gap-2 text-xs text-white/60"><ArrowUp className="h-3.5 w-3.5 text-orange" />Pengeluaran</div>
          <div className="mt-2 text-3xl font-bold text-orange">Rp 4.380 Jt</div>
          <div className="text-xs text-white/50">52% dari budget</div>
        </Card>
        <Card className="glass-dark border-white/10 p-5 text-white">
          <div className="flex items-center gap-2 text-xs text-white/60"><Wallet className="h-3.5 w-3.5 text-gold" />Saldo</div>
          <div className="mt-2 text-3xl font-bold text-gold">Rp 1.080 Jt</div>
          <div className="text-xs text-white/50">Cukup untuk 6 minggu</div>
        </Card>
      </div>
      <Card className="glass-dark border-white/10 p-5 text-white">
        <div className="text-sm font-semibold">Trend Arus Kas (Rp Juta)</div>
        <div className="mt-3 h-64">
          <ResponsiveContainer>
            <LineChart data={trendKeuangan}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.06)" strokeDasharray="3 3" />
              <XAxis dataKey="bulan" stroke="oklch(1 0 0 / 0.5)" fontSize={11} />
              <YAxis stroke="oklch(1 0 0 / 0.5)" fontSize={11} />
              <Tooltip {...chartTooltip} />
              <Line type="monotone" dataKey="in" stroke="var(--color-teal)" strokeWidth={2.5} name="Pemasukan" />
              <Line type="monotone" dataKey="out" stroke="var(--color-orange)" strokeWidth={2.5} name="Pengeluaran" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function TransaksiTable() {
  const color: Record<string,string> = {
    Approved: "bg-teal/20 text-teal border border-teal/40",
    Pending: "bg-orange/20 text-orange border border-orange/40",
    Rejected: "bg-destructive/20 text-destructive border border-destructive/40",
  };
  return (
    <Card className="glass-dark border-white/10 p-4 text-white">
      <div className="mb-3 flex items-center justify-between gap-2">
        <Select defaultValue="all"><SelectTrigger className="w-[180px] bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">Semua Kategori</SelectItem><SelectItem value="op">Operasional</SelectItem></SelectContent>
        </Select>
        <Button size="sm" variant="outline">Export CSV</Button>
      </div>
      <table className="w-full text-sm">
        <thead className="text-left text-xs text-white/50"><tr>
          <th className="p-2">ID</th><th className="p-2">Tanggal</th><th className="p-2">Kategori</th><th className="p-2">Deskripsi</th>
          <th className="p-2">Tipe</th><th className="p-2 text-right">Jumlah</th><th className="p-2">Status</th>
        </tr></thead>
        <tbody>{transaksiKeuangan.map(t=>(
          <tr key={t.id} className="border-t border-white/5">
            <td className="p-2 font-mono text-xs">{t.id}</td>
            <td className="p-2 text-white/70">{t.tanggal}</td>
            <td className="p-2">{t.kategori}</td>
            <td className="p-2 text-white/70">{t.deskripsi}</td>
            <td className="p-2"><span className={t.tipe==="Pemasukan"?"text-teal":"text-orange"}>{t.tipe}</span></td>
            <td className="p-2 text-right font-mono">Rp {t.jumlah.toLocaleString("id-ID")}</td>
            <td className="p-2"><Badge className={color[t.status]}>{t.status}</Badge></td>
          </tr>
        ))}</tbody>
      </table>
    </Card>
  );
}

function DonaturList() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {donatur.map(d=>(
        <Card key={d.nama} className="glass-dark border-white/10 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20 text-gold"><Heart className="h-5 w-5" /></div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold">{d.nama}</div>
              <div className="text-xs text-white/60">{d.tipe}</div>
            </div>
            <div className="text-right"><div className="text-sm font-bold text-gold">Rp {(d.komitmen/1e6).toFixed(0)} Jt</div><div className="text-[10px] text-white/50">komitmen</div></div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Approval() {
  const items = transaksiKeuangan.filter(t=>t.status==="Pending");
  return (
    <Card className="glass-dark border-white/10 p-4 text-white">
      <div className="space-y-2">
        {items.map(t=>(
          <div key={t.id} className="flex flex-wrap items-center gap-3 rounded-lg bg-white/5 p-3">
            <Clock className="h-4 w-4 text-orange" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">{t.deskripsi}</div>
              <div className="text-xs text-white/60">{t.kategori} · {t.tanggal} · Rp {t.jumlah.toLocaleString("id-ID")}</div>
            </div>
            <Button size="sm" variant="outline" className="border-destructive/40 text-destructive" onClick={()=>toast.error("Pencairan ditolak")}><XCircle className="mr-1 h-3.5 w-3.5"/>Tolak</Button>
            <Button size="sm" className="bg-teal text-teal-foreground hover:bg-teal/90" onClick={()=>toast.success("Pencairan disetujui")}><CheckCircle className="mr-1 h-3.5 w-3.5"/>Setujui</Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ROIChart() {
  return (
    <Card className="glass-dark border-white/10 p-5 text-white">
      <div className="text-sm font-semibold">Heatmap ROI Politik per Wilayah</div>
      <div className="text-xs text-white/60">Biaya kampanye per suara (lebih kecil = lebih efisien)</div>
      <div className="mt-4 h-72">
        <ResponsiveContainer>
          <BarChart data={roiWilayah}>
            <CartesianGrid stroke="oklch(1 0 0 / 0.06)" strokeDasharray="3 3" />
            <XAxis dataKey="w" stroke="oklch(1 0 0 / 0.5)" fontSize={11} />
            <YAxis stroke="oklch(1 0 0 / 0.5)" fontSize={11} />
            <Tooltip {...chartTooltip} />
            <Bar dataKey="roi" fill="var(--color-gold)" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function Laporan() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {["Laporan Bulanan","Laporan KPU","Laporan Audit Internal"].map(l=>(
        <Card key={l} className="glass-dark border-white/10 p-5 text-white">
          <div className="font-semibold">{l}</div>
          <div className="mt-1 text-xs text-white/60">Periode Juni 2026</div>
          <div className="mt-4 flex gap-2"><Button size="sm" variant="outline">Lihat</Button><Button size="sm" className="bg-gold text-gold-foreground">Export PDF</Button></div>
        </Card>
      ))}
    </div>
  );
}
