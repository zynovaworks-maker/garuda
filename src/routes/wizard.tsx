import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { electionTypes, packages, strategies } from "@/lib/mock-data";
import { defaultCampaignSetup, getElectionMeta, saveCampaignSetup } from "@/lib/campaign-setup";
import {
  ArrowRight, ArrowLeft, Check, Upload, Building2, MapPin, Vote, Crown,
  Sparkles, Network, DoorOpen, Users, Flag, Zap,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/wizard")({
  head: () => ({ meta: [{ title: "Setup Wizard — GARUDA" }] }),
  component: WizardPage,
});

const stepLabels = ["Campaign", "Kontestasi", "Paket", "Struktur", "Strategi"];
const stratIcons: Record<string, any> = { DoorOpen, Network, Users, Flag, Zap };
const electionIcons: Record<string, any> = { pilkades: Building2, "pileg-kab": MapPin, "pileg-prov": MapPin, "pileg-ri": Vote, pilkada: Crown, pilgub: Crown };

function WizardPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(defaultCampaignSetup);
  const progress = ((step + 1) / 5) * 100;
  const next = () => setStep(s => Math.min(4, s + 1));
  const prev = () => setStep(s => Math.max(0, s - 1));
  const finish = () => {
    const finalData = {
      ...data,
      nama: data.nama.trim() || defaultCampaignSetup.nama,
      kandidat: data.kandidat.trim() || defaultCampaignSetup.kandidat,
      tahun: data.tahun.trim() || defaultCampaignSetup.tahun,
    };
    saveCampaignSetup(finalData);
    toast.success("Campaign berhasil dibuat. Mengarahkan ke dashboard...");
    setTimeout(() => navigate({ to: "/app" }), 800);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/"><Logo /></Link>
          <Link to="/login"><Button variant="ghost" size="sm">Lewati Demo</Button></Link>
        </div>
      </header>

      <div className="container mx-auto max-w-5xl px-4 py-10">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs">
            {stepLabels.map((l, i) => (
              <div key={l} className={cn("flex flex-col items-center gap-1.5", i <= step ? "text-foreground" : "text-muted-foreground")}>
                <div className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold",
                  i < step ? "bg-teal text-white" : i === step ? "bg-primary text-primary-foreground" : "bg-muted",
                )}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className="hidden sm:inline font-medium">{l}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="mt-4" />
        </div>

        <Card className="p-6 md:p-10 shadow-premium">
          {step === 0 && (
            <div>
              <Badge variant="outline">Langkah 1 dari 5</Badge>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl">Buat Campaign Baru</h2>
              <p className="mt-1 text-sm text-muted-foreground">Informasi dasar tentang kampanye dan kandidat Anda.</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label>Nama Campaign</Label>
                  <Input placeholder="cth. Suryanto Untuk Indonesia 2026" value={data.nama} onChange={e => setData({ ...data, nama: e.target.value })} />
                </div>
                <div>
                  <Label>Nama Kandidat</Label>
                  <Input placeholder="cth. Ir. H. Suryanto, M.M." value={data.kandidat} onChange={e => setData({ ...data, kandidat: e.target.value })} />
                </div>
                <div>
                  <Label>Tahun Pemilihan</Label>
                  <Input type="number" value={data.tahun} onChange={e => setData({ ...data, tahun: e.target.value })} />
                </div>
                <UploadCard label="Logo Campaign" />
                <UploadCard label="Foto Kandidat" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <Badge variant="outline">Langkah 2 dari 5</Badge>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl">Pilih Jenis Kontestasi</h2>
              <p className="mt-1 text-sm text-muted-foreground">Struktur organisasi akan dibentuk otomatis berdasarkan pilihan ini.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {electionTypes.map(et => {
                  const Icon = electionIcons[et.kode] ?? Vote;
                  const active = data.election === et.kode;
                  return (
                    <button key={et.kode} type="button" onClick={() => setData({ ...data, election: et.kode })}
                      className={cn("text-left rounded-xl border-2 p-5 transition", active ? "border-gold bg-gold/5 shadow-gold" : "border-border hover:border-primary/40")}>
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", active ? "bg-gold text-gold-foreground" : "bg-muted")}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="mt-3 font-bold">{et.nama}</div>
                      <div className="text-xs text-muted-foreground">{et.desc}</div>
                      {active && <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-gold"><Check className="h-3 w-3" /> Dipilih</div>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <Badge variant="outline">Langkah 3 dari 5</Badge>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl">Pilih Paket GARUDA</h2>
              <p className="mt-1 text-sm text-muted-foreground">Setiap paket bisa di-upgrade kapan saja.</p>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {packages.map((p, i) => {
                  const active = data.pkg === p.nama;
                  const recommended = i === 1;
                  return (
                    <button key={p.nama} type="button" onClick={() => setData({ ...data, pkg: p.nama })}
                      className={cn("flex flex-col text-left rounded-xl border-2 p-6 transition", active ? "border-gold bg-gold/5 shadow-gold" : "border-border hover:border-primary/40")}>
                      <div className="flex items-center justify-between">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">Paket</div>
                        {recommended && <Badge className="bg-gold text-gold-foreground">Rekomendasi</Badge>}
                      </div>
                      <div className="mt-2 text-lg font-bold">{p.nama}</div>
                      <div className="mt-1 text-sm font-semibold text-primary">{p.harga}</div>
                      <div className="mt-1 text-xs text-muted-foreground">Cocok untuk: {p.cocok}</div>
                      <ul className="mt-4 flex-1 space-y-1.5 text-sm">
                        {p.fitur.map(f => (
                          <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{f}</li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <Badge variant="outline">Langkah 4 dari 5</Badge>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl">Sistem Membentuk Struktur</h2>
              <p className="mt-1 text-sm text-muted-foreground">Hierarki otomatis berdasarkan jenis kontestasi yang Anda pilih.</p>

              <div className="mt-6 rounded-xl bg-gradient-to-br from-primary to-[oklch(0.3_0.09_250)] p-6 text-white">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold">
                  <Sparkles className="h-3.5 w-3.5" /> Struktur Otomatis · {getElectionMeta(data.election).nama}
                </div>
                <div className="mt-6 flex flex-col items-center gap-3 lg:flex-row lg:justify-between lg:gap-2">
                  {getElectionMeta(data.election).hierarchy.map((h, i, arr) => (
                    <div key={h} className="flex w-full items-center gap-2 lg:w-auto lg:flex-col">
                      <div className="flex flex-1 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-sm font-semibold backdrop-blur lg:flex-none lg:min-w-[140px]">
                        {h}
                      </div>
                      {i < arr.length - 1 && (
                        <ArrowRight className="hidden h-5 w-5 text-gold lg:block" />
                      )}
                      {i < arr.length - 1 && (
                        <div className="h-6 w-px bg-white/30 lg:hidden" />
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs text-white/60">
                  Sistem akan otomatis menyiapkan slot untuk korlap, relawan, dan TPS sesuai struktur di atas.
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <Badge variant="outline">Langkah 5 dari 5</Badge>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl">Strategi Kampanye</h2>
              <p className="mt-1 text-sm text-muted-foreground">Pilih pendekatan utama. Bisa diubah kapan saja di dashboard.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {strategies.map(s => {
                  const Icon = stratIcons[s.icon] ?? Zap;
                  const active = data.strategy === s.kode;
                  return (
                    <button key={s.kode} type="button" onClick={() => setData({ ...data, strategy: s.kode })}
                      className={cn("text-left rounded-xl border-2 p-5 transition", active ? "border-gold bg-gold/5 shadow-gold" : "border-border hover:border-primary/40")}>
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", active ? "bg-gold text-gold-foreground" : "bg-muted")}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="mt-3 font-bold">{s.nama}</div>
                      <div className="text-xs text-muted-foreground">{s.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <Button variant="outline" onClick={prev} disabled={step === 0}>
              <ArrowLeft className="mr-1 h-4 w-4" /> Kembali
            </Button>
            <div className="text-xs text-muted-foreground">Langkah {step + 1} / 5</div>
            {step < 4 ? (
              <Button onClick={next} className="bg-primary text-primary-foreground">
                Lanjut <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={finish} className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-gold">
                Selesai & Masuk Dashboard <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function UploadCard({ label }: { label: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1 flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40 transition hover:border-primary/40">
        <Upload className="h-5 w-5 text-muted-foreground" />
        <div className="mt-2 text-xs text-muted-foreground">Klik untuk upload (placeholder)</div>
      </div>
    </div>
  );
}
