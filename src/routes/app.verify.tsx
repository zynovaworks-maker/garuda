import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Upload, FileImage, CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";
import { verifikasiTPS } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/verify")({ component: VerifyPage });

const statusMeta: Record<string, { c: string; i: any }> = {
  "Menunggu": { c: "bg-white/10 text-white/70 border border-white/20", i: Clock },
  "Perlu Review": { c: "bg-orange/20 text-orange border border-orange/40", i: AlertCircle },
  "Terverifikasi": { c: "bg-teal/20 text-teal border border-teal/40", i: CheckCircle2 },
  "Ditolak": { c: "bg-destructive/20 text-destructive border border-destructive/40", i: XCircle },
};

function VerifyPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white">GARUDA VERIFY</h1>
        <p className="text-sm text-white/60">Pusat verifikasi hasil TPS dan dokumentasi Form C1.</p>
      </div>

      <Tabs defaultValue="input">
        <TabsList className="bg-white/5 text-white flex-wrap h-auto">
          <TabsTrigger value="input">Input Hasil TPS</TabsTrigger>
          <TabsTrigger value="upload">Upload C1</TabsTrigger>
          <TabsTrigger value="queue">Verifikasi TPS</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
          <TabsTrigger value="rekap">Rekapitulasi</TabsTrigger>
          <TabsTrigger value="dok">Dokumentasi</TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="mt-4"><InputTPS /></TabsContent>
        <TabsContent value="upload" className="mt-4"><UploadC1 /></TabsContent>
        <TabsContent value="queue" className="mt-4"><VerifyQueue /></TabsContent>
        <TabsContent value="audit" className="mt-4"><Audit /></TabsContent>
        <TabsContent value="rekap" className="mt-4"><Rekap /></TabsContent>
        <TabsContent value="dok" className="mt-4"><Dokumentasi /></TabsContent>
      </Tabs>
    </div>
  );
}

function InputTPS() {
  return (
    <Card className="glass-dark border-white/10 p-5 text-white">
      <div className="text-sm font-semibold">Form Input Hasil TPS</div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {["No TPS","Kelurahan","Saksi"].map(l=>(
          <div key={l}><div className="text-xs text-white/60 mb-1">{l}</div><input className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm" /></div>
        ))}
        {["Kandidat","Lawan A","Lawan B","Suara Tidak Sah"].map(l=>(
          <div key={l}><div className="text-xs text-white/60 mb-1">Perolehan {l}</div><input type="number" className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm" /></div>
        ))}
      </div>
      <Button className="mt-4 bg-gold text-gold-foreground" onClick={()=>toast.success("Hasil TPS tersimpan, menunggu verifikasi")}>Simpan & Submit</Button>
    </Card>
  );
}

function UploadC1() {
  return (
    <Card className="glass-dark border-white/10 p-5 text-white">
      <div className="text-sm font-semibold">Upload Form C1</div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5">
          <Upload className="h-8 w-8 text-gold" />
          <div className="mt-2 text-sm">Drop foto Form C1 di sini</div>
          <div className="text-xs text-white/50">JPG, PNG · max 5 MB</div>
          <Button size="sm" className="mt-3 bg-gold text-gold-foreground" onClick={()=>toast.success("Form C1 ter-upload (mock)")}>Pilih File</Button>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex aspect-[4/5] items-center justify-center rounded-lg bg-gradient-to-br from-white/10 to-white/0 border border-white/10">
            <FileImage className="h-16 w-16 text-white/30" />
          </div>
          <div className="mt-3 text-xs text-white/60">Preview C1-2007 · TPS 007 · Kel. Sunter Agung</div>
        </div>
      </div>
    </Card>
  );
}

function VerifyQueue() {
  return (
    <Card className="glass-dark border-white/10 p-4 text-white">
      <table className="w-full text-sm">
        <thead className="text-left text-xs text-white/50"><tr><th className="p-2">ID</th><th className="p-2">TPS</th><th className="p-2">Kelurahan</th><th className="p-2">Saksi</th><th className="p-2">Kandidat</th><th className="p-2">Status</th><th className="p-2"></th></tr></thead>
        <tbody>{verifikasiTPS.map(v=>{
          const M = statusMeta[v.status];
          return (
            <tr key={v.id} className="border-t border-white/5">
              <td className="p-2 font-mono text-xs">{v.id}</td>
              <td className="p-2 font-medium">{v.tps}</td>
              <td className="p-2 text-white/70">{v.kelurahan}</td>
              <td className="p-2 text-white/70">{v.saksi}</td>
              <td className="p-2 font-semibold text-gold">{v.perolehan.kandidat}</td>
              <td className="p-2"><Badge className={M.c}><M.i className="mr-1 h-3 w-3"/>{v.status}</Badge></td>
              <td className="p-2">
                {v.status === "Menunggu" || v.status === "Perlu Review" ? (
                  <div className="flex gap-1"><Button size="sm" variant="ghost" className="text-destructive" onClick={()=>toast.error("Ditolak")}>Tolak</Button>
                  <Button size="sm" className="bg-teal text-teal-foreground" onClick={()=>toast.success("Diverifikasi")}>Setujui</Button></div>
                ) : <Button size="sm" variant="ghost" className="text-xs">Detail</Button>}
              </td>
            </tr>
          );
        })}</tbody>
      </table>
    </Card>
  );
}

function Audit() {
  return (
    <Card className="glass-dark border-white/10 p-4 text-white">
      <div className="space-y-2">
        {[
          ["09:42","Eko S.","Verifikasi C1-2007 → Terverifikasi"],
          ["09:21","Sinta W.","Reject C1-2003 (foto blur)"],
          ["08:55","Eko S.","Verifikasi C1-2002 → Terverifikasi"],
        ].map(([t,u,a])=>(
          <div key={a} className="flex items-center gap-3 rounded-lg bg-white/5 p-3 text-sm">
            <div className="text-xs font-mono text-gold w-14">{t}</div>
            <div className="text-white/80">{u}</div>
            <div className="text-white/60">{a}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Rekap() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[{n:"Kandidat",v:412840,c:"gold"},{n:"Lawan A",v:280210,c:"teal"},{n:"Lawan B",v:165020,c:"orange"}].map(p=>(
        <Card key={p.n} className="glass-dark border-white/10 p-5 text-white">
          <div className="text-xs text-white/60">{p.n}</div>
          <div className={`mt-2 text-3xl font-bold text-${p.c}`}>{p.v.toLocaleString("id-ID")}</div>
          <div className="text-xs text-white/50">suara terverifikasi</div>
        </Card>
      ))}
    </div>
  );
}

function Dokumentasi() {
  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({length:8}).map((_,i)=>(
        <Card key={i} className="glass-dark border-white/10 p-3 text-white">
          <div className="flex aspect-[4/5] items-center justify-center rounded-lg bg-gradient-to-br from-white/10 to-white/0 border border-white/10">
            <FileImage className="h-10 w-10 text-white/30" />
          </div>
          <div className="mt-2 text-xs font-medium">C1-{2000+i}</div>
          <div className="text-[10px] text-white/50">TPS {String(i+1).padStart(3,"0")}</div>
        </Card>
      ))}
    </div>
  );
}
