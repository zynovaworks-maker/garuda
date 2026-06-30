import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search, Plus, ChevronLeft, ChevronRight, UserPlus } from "lucide-react";
import { dptSample } from "@/lib/mock-data";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/app/vote")({ component: VotePage });

const statusColor: Record<string, string> = {
  "Pendukung": "bg-teal/20 text-teal border border-teal/40",
  "Swing": "bg-orange/20 text-orange border border-orange/40",
  "Belum Dipetakan": "bg-white/10 text-white/70 border border-white/20",
};

function VotePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white">GARUDA VOTE</h1>
        <p className="text-sm text-white/60">Manajemen pemilih, pendukung, survey, dan TPS.</p>
      </div>

      <Tabs defaultValue="dpt">
        <TabsList className="bg-white/5 text-white">
          <TabsTrigger value="dpt">Data DPT</TabsTrigger>
          <TabsTrigger value="pendukung">Pendukung</TabsTrigger>
          <TabsTrigger value="segmentasi">Segmentasi</TabsTrigger>
          <TabsTrigger value="survey">Survey</TabsTrigger>
          <TabsTrigger value="quick">Quick Count</TabsTrigger>
          <TabsTrigger value="real">Real Count</TabsTrigger>
          <TabsTrigger value="tps">Manajemen TPS</TabsTrigger>
          <TabsTrigger value="potensi">Analisis Potensi</TabsTrigger>
        </TabsList>

        <TabsContent value="dpt" className="mt-4"><DPTTable /></TabsContent>
        <TabsContent value="pendukung" className="mt-4"><DPTTable filter="Pendukung" /></TabsContent>
        <TabsContent value="segmentasi" className="mt-4"><Segmentasi /></TabsContent>
        <TabsContent value="survey" className="mt-4"><Survey /></TabsContent>
        <TabsContent value="quick" className="mt-4"><QuickCount /></TabsContent>
        <TabsContent value="real" className="mt-4"><QuickCount real /></TabsContent>
        <TabsContent value="tps" className="mt-4"><TPSMgmt /></TabsContent>
        <TabsContent value="potensi" className="mt-4"><Segmentasi /></TabsContent>
      </Tabs>
    </div>
  );
}

function DPTTable({ filter }: { filter?: string }) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;
  const all = dptSample.filter(d => (!filter || d.status === filter) && (d.nama.toLowerCase().includes(q.toLowerCase()) || d.tps.toLowerCase().includes(q.toLowerCase())));
  const pages = Math.max(1, Math.ceil(all.length / perPage));
  const rows = all.slice((page - 1) * perPage, page * perPage);

  return (
    <Card className="glass-dark border-white/10 p-4 text-white">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <Input placeholder="Cari nama atau TPS…" value={q} onChange={e=>{setQ(e.target.value); setPage(1);}} className="bg-white/5 border-white/10 pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px] bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kelurahan</SelectItem>
            <SelectItem value="s">Sunter Agung</SelectItem>
            <SelectItem value="w">Warakas</SelectItem>
          </SelectContent>
        </Select>
        <AddSupporterDialog />
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs text-white/50">
            <tr>
              <th className="p-2">NIK</th><th className="p-2">Nama</th><th className="p-2">Alamat</th>
              <th className="p-2">Kelurahan</th><th className="p-2">TPS</th><th className="p-2">Status</th><th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(d => (
              <tr key={d.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="p-2 font-mono text-xs">{d.id}</td>
                <td className="p-2 font-medium">{d.nama}</td>
                <td className="p-2 text-white/70">{d.alamat}</td>
                <td className="p-2 text-white/70">{d.kelurahan}</td>
                <td className="p-2 text-white/70">{d.tps}</td>
                <td className="p-2"><span className={`rounded-full px-2 py-0.5 text-[11px] ${statusColor[d.status]}`}>{d.status}</span></td>
                <td className="p-2"><DetailDrawer row={d} /></td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={7} className="p-8 text-center text-white/50">Tidak ada data.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-white/60">
        <span>Menampilkan {rows.length} dari {all.length}</span>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" disabled={page===1} onClick={()=>setPage(p=>p-1)}><ChevronLeft className="h-4 w-4" /></Button>
          <span>Halaman {page} / {pages}</span>
          <Button size="sm" variant="outline" disabled={page===pages} onClick={()=>setPage(p=>p+1)}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>
    </Card>
  );
}

function DetailDrawer({ row }: { row: typeof dptSample[number] }) {
  return (
    <Sheet>
      <SheetTrigger asChild><Button size="sm" variant="ghost" className="text-xs">Detail</Button></SheetTrigger>
      <SheetContent className="bg-card">
        <SheetHeader><SheetTitle>{row.nama}</SheetTitle></SheetHeader>
        <div className="mt-4 space-y-3 text-sm">
          <div><div className="text-xs text-muted-foreground">NIK</div><div className="font-mono">{row.id}</div></div>
          <div><div className="text-xs text-muted-foreground">Alamat</div><div>{row.alamat}, {row.kelurahan}</div></div>
          <div><div className="text-xs text-muted-foreground">TPS</div><div>{row.tps}</div></div>
          <div><div className="text-xs text-muted-foreground">Status</div><Badge>{row.status}</Badge></div>
          <div><div className="text-xs text-muted-foreground">Catatan Korlap</div><div className="rounded bg-muted p-2 text-xs">Komitmen dukungan dikonfirmasi pada kunjungan ke-2.</div></div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function AddSupporterDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gold text-gold-foreground hover:bg-gold/90"><UserPlus className="mr-1 h-4 w-4" /> Tambah Pendukung</Button>
      </DialogTrigger>
      <DialogContent className="bg-card">
        <DialogHeader><DialogTitle>Tambah Data Pendukung</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>NIK</Label><Input placeholder="16 digit NIK" /></div>
          <div><Label>Nama Lengkap</Label><Input /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Kelurahan</Label><Input /></div>
            <div><Label>TPS</Label><Input placeholder="TPS 001" /></div>
          </div>
          <div><Label>Catatan</Label><Input placeholder="cth. komitmen dukungan via majelis taklim" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={()=>setOpen(false)}>Batal</Button>
          <Button onClick={()=>{ setOpen(false); toast.success("Pendukung berhasil ditambahkan"); }}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Segmentasi() {
  const segs = [
    { nama: "Gen Z (17-26)", jml: 142800, pct: 22 },
    { nama: "Milenial (27-42)", jml: 312400, pct: 38 },
    { nama: "Gen X (43-58)", jml: 198200, pct: 24 },
    { nama: "Boomer (59+)", jml: 98100, pct: 16 },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {segs.map(s=>(
        <Card key={s.nama} className="glass-dark border-white/10 p-4 text-white">
          <div className="text-xs text-white/60">{s.nama}</div>
          <div className="mt-2 text-2xl font-bold">{s.jml.toLocaleString("id-ID")}</div>
          <div className="text-xs text-gold">{s.pct}% dari pemilih</div>
        </Card>
      ))}
    </div>
  );
}

function Survey() {
  const survey = [{n:"Kandidat",v:46},{n:"Lawan A",v:21},{n:"Lawan B",v:15},{n:"Undecided",v:18}];
  return (
    <Card className="glass-dark border-white/10 p-5 text-white">
      <div className="text-sm font-semibold">Survey Elektabilitas Minggu Ini (n=1.200)</div>
      <div className="mt-4 space-y-3">
        {survey.map(s=>(
          <div key={s.n}>
            <div className="flex justify-between text-xs"><span>{s.n}</span><span className="font-semibold text-gold">{s.v}%</span></div>
            <div className="mt-1 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gold to-orange" style={{width:`${s.v*2}%`,maxWidth:"100%"}} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function QuickCount({ real }: { real?: boolean }) {
  return (
    <Card className="glass-dark border-white/10 p-5 text-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">{real ? "Real Count" : "Quick Count"} — Live</div>
          <div className="text-xs text-white/60">Sampel masuk: {real ? "3.240 / 3.240 TPS (100%)" : "2.184 / 3.240 TPS (67%)"}</div>
        </div>
        <Badge className="bg-teal/20 text-teal border border-teal/40">● Live</Badge>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[{n:"Kandidat",v:48.2,c:"gold"},{n:"Lawan A",v:32.6,c:"teal"},{n:"Lawan B",v:19.2,c:"orange"}].map(p=>(
          <div key={p.n} className={`rounded-xl border border-white/10 bg-white/5 p-4`}>
            <div className="text-xs text-white/60">{p.n}</div>
            <div className={`mt-1 text-3xl font-bold text-${p.c}`}>{p.v}%</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TPSMgmt() {
  const tps = Array.from({length:10}).map((_,i)=>({
    nama: `TPS ${String(i+1).padStart(3,"0")}`,
    kel: ["Sunter Agung","Warakas","Marunda"][i%3],
    pemilih: 280 + i*7,
    saksi: i%3===0 ? "Belum" : "Lengkap",
  }));
  return (
    <Card className="glass-dark border-white/10 p-4 text-white">
      <table className="w-full text-sm">
        <thead className="text-left text-xs text-white/50"><tr><th className="p-2">TPS</th><th className="p-2">Kelurahan</th><th className="p-2">Pemilih</th><th className="p-2">Saksi</th></tr></thead>
        <tbody>{tps.map(t=>(
          <tr key={t.nama} className="border-t border-white/5"><td className="p-2 font-medium">{t.nama}</td><td className="p-2">{t.kel}</td><td className="p-2">{t.pemilih}</td>
            <td className="p-2"><Badge className={t.saksi==="Lengkap"?"bg-teal/20 text-teal border border-teal/40":"bg-orange/20 text-orange border border-orange/40"}>{t.saksi}</Badge></td>
          </tr>
        ))}</tbody>
      </table>
    </Card>
  );
}
