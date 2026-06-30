import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, X, Database, Shield } from "lucide-react";
import { users, auditLog } from "@/lib/mock-data";

export const Route = createFileRoute("/app/admin")({ component: AdminPage });

const roleColor: Record<string, string> = {
  "Super Admin": "bg-gold/20 text-gold border border-gold/40",
  "Campaign Manager": "bg-teal/20 text-teal border border-teal/40",
  "Korlap": "bg-orange/20 text-orange border border-orange/40",
  "Finance": "bg-white/10 text-white/80 border border-white/20",
  "Relawan": "bg-white/10 text-white/80 border border-white/20",
  "Verifikator TPS": "bg-teal/20 text-teal border border-teal/40",
};

const perms = ["MAP","VOTE","FORCE","FUND","VERIFY","REPORT","ADMIN"];
const matrix: Record<string, boolean[]> = {
  "Super Admin":      [true,true,true,true,true,true,true],
  "Campaign Manager": [true,true,true,true,true,true,false],
  "Korlap":           [true,true,true,false,false,false,false],
  "Finance":          [false,false,false,true,false,true,false],
  "Verifikator TPS":  [false,false,false,false,true,true,false],
  "Relawan":          [true,true,false,false,false,false,false],
};

function AdminPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white">GARUDA ADMIN</h1>
        <p className="text-sm text-white/60">User, RBAC, audit log, dan pengaturan sistem.</p>
      </div>

      <Tabs defaultValue="user">
        <TabsList className="bg-white/5 text-white flex-wrap h-auto">
          <TabsTrigger value="user">Manajemen User</TabsTrigger>
          <TabsTrigger value="rbac">Hak Akses / RBAC</TabsTrigger>
          <TabsTrigger value="org">Organisasi</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
          <TabsTrigger value="backup">Backup Data</TabsTrigger>
          <TabsTrigger value="set">Pengaturan</TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="mt-4">
          <Card className="glass-dark border-white/10 p-4 text-white">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-white/50"><tr><th className="p-2">User</th><th className="p-2">Email</th><th className="p-2">Role</th><th className="p-2">Status</th><th className="p-2"></th></tr></thead>
              <tbody>{users.map(u=>(
                <tr key={u.email} className="border-t border-white/5">
                  <td className="p-2"><div className="flex items-center gap-2"><Avatar className="h-8 w-8"><AvatarFallback className="bg-gold/20 text-gold text-xs">{u.nama[0]}</AvatarFallback></Avatar><span className="font-medium">{u.nama}</span></div></td>
                  <td className="p-2 text-white/70">{u.email}</td>
                  <td className="p-2"><Badge className={roleColor[u.role]}>{u.role}</Badge></td>
                  <td className="p-2"><Badge className={u.status==="Aktif"?"bg-teal/20 text-teal border border-teal/40":"bg-white/10 text-white/60 border border-white/20"}>● {u.status}</Badge></td>
                  <td className="p-2 text-right"><Button size="sm" variant="ghost" className="text-xs">Edit</Button></td>
                </tr>
              ))}</tbody>
            </table>
          </Card>
        </TabsContent>

        <TabsContent value="rbac" className="mt-4">
          <Card className="glass-dark border-white/10 p-4 text-white overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-xs text-white/50">
                <th className="p-2">Role</th>{perms.map(p=><th key={p} className="p-2 text-center">{p}</th>)}
              </tr></thead>
              <tbody>{Object.entries(matrix).map(([role,perms2])=>(
                <tr key={role} className="border-t border-white/5">
                  <td className="p-2"><Badge className={roleColor[role]}>{role}</Badge></td>
                  {perms2.map((v,i)=><td key={i} className="p-2 text-center">{v?<Check className="mx-auto h-4 w-4 text-teal"/>:<X className="mx-auto h-4 w-4 text-white/30"/>}</td>)}
                </tr>
              ))}</tbody>
            </table>
          </Card>
        </TabsContent>

        <TabsContent value="org" className="mt-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {["DPP Kampanye","Tim Wilayah Jakut","Tim Saksi"].map(o=>(
              <Card key={o} className="glass-dark border-white/10 p-5 text-white">
                <div className="font-semibold">{o}</div>
                <div className="mt-1 text-xs text-white/60">Struktur unit operasional</div>
                <div className="mt-3 flex items-center gap-2 text-xs"><Shield className="h-3.5 w-3.5 text-gold"/>12 anggota aktif</div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <Card className="glass-dark border-white/10 p-4 text-white">
            <div className="space-y-2">{auditLog.map((a,i)=>(
              <div key={i} className="flex flex-wrap items-center gap-3 rounded-lg bg-white/5 p-3 text-sm">
                <div className="text-xs font-mono text-gold w-32 shrink-0">{a.waktu}</div>
                <div className="font-medium">{a.aktor}</div>
                <div className="flex-1 min-w-0 text-white/70 truncate">{a.aksi}</div>
                <Badge variant="outline" className="border-white/20 text-white/70 text-[10px]">{a.kategori}</Badge>
              </div>
            ))}</div>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="mt-4">
          <Card className="glass-dark border-white/10 p-5 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/20 text-teal"><Database className="h-6 w-6"/></div>
              <div><div className="font-semibold">Backup Terakhir: 30 Jun 2026, 03:00 WIB</div><div className="text-xs text-white/60">Otomatis harian · Enkripsi AES-256 · Retensi 90 hari</div></div>
              <Badge className="ml-auto bg-teal/20 text-teal border border-teal/40">Sehat</Badge>
            </div>
            <div className="mt-4 flex gap-2"><Button className="bg-gold text-gold-foreground">Backup Sekarang</Button><Button variant="outline" className="border-white/20">Restore</Button></div>
          </Card>
        </TabsContent>

        <TabsContent value="set" className="mt-4">
          <Card className="glass-dark border-white/10 p-5 text-white">
            <div className="font-semibold">Pengaturan Sistem</div>
            <div className="mt-3 space-y-2 text-sm text-white/70">
              <div>• Notifikasi WhatsApp untuk approval pencairan dana</div>
              <div>• Auto-lock TPS setelah 18:00 WIB</div>
              <div>• Multi-factor authentication wajib untuk Super Admin</div>
              <div>• Consent-based data collection (PDP UU 27/2022)</div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
