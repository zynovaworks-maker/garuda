import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileBarChart, Download, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { aktivitasRelawan } from "@/lib/mock-data";

export const Route = createFileRoute("/app/report")({ component: ReportPage });

const reports = [
  { n: "Laporan Pemilih", d: "Rekap DPT, pendukung, swing voter per wilayah" },
  { n: "Laporan Pendukung", d: "Distribusi pendukung & sumber konversi" },
  { n: "Laporan Relawan", d: "Aktivitas, kehadiran, performa relawan" },
  { n: "Laporan TPS", d: "Status verifikasi & hasil TPS" },
  { n: "Laporan Keuangan", d: "Arus kas, donatur, dan kategori belanja" },
  { n: "Laporan ROI", d: "Efektivitas anggaran kampanye per wilayah" },
];

function ReportPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white">GARUDA REPORT</h1>
        <p className="text-sm text-white/60">Analytics & laporan siap ekspor.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map(r => (
          <Card key={r.n} className="glass-dark border-white/10 p-5 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/20 text-gold"><FileBarChart className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1"><div className="font-semibold">{r.n}</div><div className="text-xs text-white/60">{r.d}</div></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="border-white/20" onClick={()=>toast.success("PDF di-generate")}><Download className="mr-1 h-3.5 w-3.5"/>PDF</Button>
              <Button size="sm" className="bg-teal text-teal-foreground" onClick={()=>toast.success("Excel di-generate")}><FileSpreadsheet className="mr-1 h-3.5 w-3.5"/>Excel</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="glass-dark border-white/10 p-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-sm font-semibold">Preview: Laporan Relawan</div>
            <div className="text-xs text-white/60">Periode 7 hari terakhir</div>
          </div>
          <Badge className="bg-gold/20 text-gold border border-gold/40">Draft</Badge>
        </div>
        <div className="mt-4 h-64">
          <ResponsiveContainer>
            <BarChart data={aktivitasRelawan}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.06)" strokeDasharray="3 3" />
              <XAxis dataKey="hari" stroke="oklch(1 0 0 / 0.5)" fontSize={11} />
              <YAxis stroke="oklch(1 0 0 / 0.5)" fontSize={11} />
              <Tooltip contentStyle={{ background:"oklch(0.16 0.05 262)", border:"1px solid oklch(0.28 0.05 262)", borderRadius:8, fontSize:12 }}/>
              <Bar dataKey="kunjungan" fill="var(--color-gold)" radius={[6,6,0,0]} />
              <Bar dataKey="sosialisasi" fill="var(--color-teal)" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <table className="mt-4 w-full text-sm">
          <thead className="text-left text-xs text-white/50"><tr><th className="p-2">Hari</th><th className="p-2 text-right">Kunjungan</th><th className="p-2 text-right">Sosialisasi</th></tr></thead>
          <tbody>{aktivitasRelawan.map(a=>(
            <tr key={a.hari} className="border-t border-white/5"><td className="p-2">{a.hari}</td><td className="p-2 text-right">{a.kunjungan}</td><td className="p-2 text-right">{a.sosialisasi}</td></tr>
          ))}</tbody>
        </table>
      </Card>
    </div>
  );
}
