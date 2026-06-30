import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, Map, Vote, Users, Wallet, ShieldCheck, Radar, FileBarChart,
  Settings, AlertTriangle, Database, BarChart3, MapPin, Eye, Check,
  GraduationCap, Radio, LayoutDashboard, Briefcase, Sparkles, ShieldAlert,
  TrendingUp, Lock, Zap,
} from "lucide-react";
import { featureModules, pricingTiers, addOns, roadmap } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GARUDA — Platform Intelijen Kampanye Berbasis GIS" },
      { name: "description", content: "Kelola pemilih, relawan, wilayah, TPS, anggaran, dan hasil pemilu dalam satu command center real-time." },
      { property: "og:title", content: "GARUDA — Memetakan Dukungan, Mengukur Kemenangan" },
      { property: "og:description", content: "Platform intelijen kampanye berbasis GIS untuk kandidat dan tim sukses." },
    ],
  }),
  component: Landing,
});

const iconMap: Record<string, any> = {
  Map, Vote, Users, Wallet, ShieldCheck, Radar, FileBarChart, Settings,
  GraduationCap, MapPin, Database, Radio, LayoutDashboard, Briefcase,
};

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <WizardPreview />
      <Pricing />
      <AddOns />
      <Roadmap />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="#fitur" className="hover:text-foreground">Fitur</a>
          <a href="#harga" className="hover:text-foreground">Harga</a>
          <a href="#roadmap" className="hover:text-foreground">Roadmap</a>
          <a href="#kontak" className="hover:text-foreground">Kontak</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login"><Button variant="ghost" size="sm">Masuk</Button></Link>
          <Link to="/wizard"><Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Mulai Demo</Button></Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero text-white">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-teal/20 blur-3xl" />
      <div className="container relative mx-auto px-4 py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-6 border-gold/40 bg-gold/10 text-gold hover:bg-gold/20">
            <Sparkles className="mr-1 h-3 w-3" /> Geospatial Analytics for Real-time Unified Data & Action
          </Badge>
          <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Platform Intelijen Kampanye{" "}
            <span className="text-gradient-gold">Berbasis GIS</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/70 md:text-lg">
            Kelola pemilih, relawan, wilayah, TPS, anggaran, dan hasil pemilu dalam satu
            command center real-time — transparan, auditable, dan siap untuk kemenangan.
          </p>
          <p className="mt-3 font-display text-sm italic text-gold/90">
            "Memetakan Dukungan, Mengukur Kemenangan"
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/wizard">
              <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-gold">
                Mulai Demo <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <a href="#fitur">
              <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                Lihat Fitur
              </Button>
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { k: "1.2 Jt+", v: "Data Pemilih" },
              { k: "4.8 Rb", v: "Relawan Aktif" },
              { k: "3.240", v: "TPS Terpantau" },
              { k: "62%", v: "Prediksi Menang" },
            ].map((s) => (
              <div key={s.v} className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                <div className="text-xl font-bold text-gold md:text-2xl">{s.k}</div>
                <div className="text-[11px] uppercase tracking-wide text-white/60">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    { icon: Database, t: "Data tersebar", d: "Data pemilih, relawan, dan keuangan terpisah di Excel, WhatsApp, dan kertas." },
    { icon: Eye, t: "Kinerja relawan kabur", d: "Sulit mengukur produktivitas korlap dan relawan di lapangan." },
    { icon: Wallet, t: "Keuangan tidak transparan", d: "Risiko kebocoran anggaran dan audit yang lemah." },
    { icon: AlertTriangle, t: "TPS lambat dilaporkan", d: "Hasil TPS terlambat masuk, sengketa sulit diverifikasi." },
    { icon: BarChart3, t: "Strategi tanpa data", d: "Keputusan kampanye lebih banyak intuisi daripada analitik." },
  ];
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline" className="border-orange/40 text-orange">Masalah Kampanye Hari Ini</Badge>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">Kampanye modern kalah karena data, bukan karena strategi.</h2>
        <p className="mt-3 text-muted-foreground">Tim sukses Indonesia masih bergantung pada laporan manual yang lambat, tidak akurat, dan rawan manipulasi.</p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {items.map((i) => (
          <Card key={i.t} className="p-5 transition hover:shadow-premium">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange/10 text-orange">
              <i.icon className="h-5 w-5" />
            </div>
            <div className="mt-3 font-semibold">{i.t}</div>
            <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Solution() {
  const pillars = [
    { icon: Map, t: "GIS Mapping", c: "teal" },
    { icon: Vote, t: "Voter Management", c: "gold" },
    { icon: Users, t: "Volunteer Ops", c: "orange" },
    { icon: Wallet, t: "Campaign Finance", c: "teal" },
    { icon: ShieldCheck, t: "TPS Verification", c: "gold" },
    { icon: Radar, t: "War Room", c: "orange" },
    { icon: FileBarChart, t: "Analytics", c: "teal" },
  ];
  const colors: Record<string,string> = { teal: "text-teal bg-teal/10", gold: "text-gold bg-gold/10", orange: "text-orange bg-orange/10" };
  return (
    <section className="border-y border-border bg-muted/40 py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="border-teal/40 text-teal">Solusi GARUDA</Badge>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Satu platform untuk seluruh siklus kampanye.</h2>
            <p className="mt-3 text-muted-foreground">
              GARUDA menyatukan GIS, manajemen pemilih, operasi relawan, keuangan, verifikasi TPS,
              dan war room — semuanya real-time, auditable, dan berbasis bukti.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[{ i: ShieldAlert, t: "Auditable" },{ i: Lock, t: "Consent-based" },{ i: TrendingUp, t: "Data-driven" },{ i: Zap, t: "Real-time" }].map(b => (
                <div key={b.t} className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium">
                  <b.i className="h-3.5 w-3.5 text-primary" /> {b.t}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {pillars.map((p) => (
              <Card key={p.t} className="flex flex-col items-center gap-2 p-5 text-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors[p.c]}`}>
                  <p.icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold">{p.t}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="fitur" className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline" className="border-gold/40 text-gold">Modul Lengkap</Badge>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">Delapan modul. Satu kemenangan.</h2>
        <p className="mt-3 text-muted-foreground">Setiap modul dirancang untuk peran spesifik dalam tim sukses, dari korlap hingga kandidat.</p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {featureModules.map((f) => {
          const Icon = iconMap[f.icon] ?? Map;
          const colors: Record<string,string> = { teal: "text-teal bg-teal/10 border-teal/30", gold: "text-gold bg-gold/10 border-gold/30", orange: "text-orange bg-orange/10 border-orange/30" };
          return (
            <Card key={f.kode} className="group relative overflow-hidden p-5 transition hover:-translate-y-1 hover:shadow-premium">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${colors[f.color]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-xs font-mono text-muted-foreground">{f.kode}</div>
              <h3 className="mt-1 text-lg font-bold">{f.nama}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function WizardPreview() {
  return (
    <section className="border-y border-border bg-gradient-to-br from-primary to-[oklch(0.3_0.09_250)] py-20 text-white">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2 lg:items-center">
        <div>
          <Badge className="border-gold/40 bg-gold/10 text-gold">Campaign Setup Wizard</Badge>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Setup kampanye dalam 5 langkah, siap tempur dalam 10 menit.</h2>
          <p className="mt-3 text-white/70">
            Wizard cerdas membentuk struktur organisasi otomatis berdasarkan jenis kontestasi —
            dari Pilkades hingga Pilgub.
          </p>
          <Link to="/wizard" className="mt-6 inline-block">
            <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-gold">
              Coba Setup Wizard <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          {[
            "Buat Campaign Baru",
            "Pilih Jenis Kontestasi",
            "Pilih Paket GARUDA",
            "Struktur Otomatis",
            "Strategi Kampanye",
          ].map((s, i) => (
            <div key={s} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-gold-foreground">
                {i + 1}
              </div>
              <div className="font-medium">{s}</div>
              <ArrowRight className="ml-auto h-4 w-4 text-white/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="harga" className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline" className="border-primary/40">Lisensi & Paket</Badge>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">Harga skala kemenangan Anda.</h2>
        <p className="mt-3 text-muted-foreground">Dari pilkades hingga pilgub — setiap level kontestasi punya paket yang tepat.</p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {pricingTiers.map((p, i) => {
          const highlight = i === 2;
          return (
            <Card key={p.nama} className={`flex flex-col p-6 ${highlight ? "border-gold shadow-gold ring-1 ring-gold/40" : ""}`}>
              {highlight && <Badge className="mb-2 w-fit bg-gold text-gold-foreground">Populer</Badge>}
              <div className="text-sm font-medium text-muted-foreground">{p.nama}</div>
              <div className="mt-2 text-xl font-bold text-foreground">{p.harga}</div>
              <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm">
                {p.fitur.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/wizard" className="mt-6"><Button className="w-full" variant={highlight ? "default" : "outline"}>Pilih Paket</Button></Link>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function AddOns() {
  return (
    <section className="border-y border-border bg-muted/40 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="border-orange/40 text-orange">Add-on Services</Badge>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Layanan tambahan profesional.</h2>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {addOns.map((a) => {
            const Icon = iconMap[a.icon] ?? Briefcase;
            return (
              <Card key={a.nama} className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-semibold">{a.nama}</div>
                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  return (
    <section id="roadmap" className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline" className="border-teal/40 text-teal">Roadmap Implementasi</Badge>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">Dari foundation ke hari H.</h2>
      </div>
      <div className="relative mt-12">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-teal to-orange md:left-1/2" />
        <div className="space-y-6">
          {roadmap.map((r, i) => (
            <div key={r.phase} className={`relative flex flex-col gap-4 md:flex-row ${i % 2 ? "md:flex-row-reverse" : ""}`}>
              <div className="md:w-1/2 md:px-8">
                <Card className="p-5">
                  <div className="text-xs font-mono uppercase tracking-widest text-gold">{r.phase}</div>
                  <div className="mt-1 text-lg font-bold">{r.nama}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                </Card>
              </div>
              <div className="absolute left-4 top-5 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-gold ring-4 ring-background md:left-1/2" />
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-hero py-20 text-white">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container relative mx-auto px-4 text-center">
        <h2 className="mx-auto max-w-3xl text-4xl font-extrabold md:text-5xl">
          Bangun Kampanye Modern <span className="text-gradient-gold">Berbasis Data</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Mulai dengan demo gratis, atau jadwalkan presentasi untuk kandidat dan tim sukses Anda.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/wizard"><Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-gold">Mulai Demo Sekarang</Button></Link>
          <Link to="/login"><Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">Masuk ke Dashboard</Button></Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="kontak" className="bg-navy-deep py-12 text-white/70">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-4">
        <div>
          <Logo className="text-white" />
          <p className="mt-3 text-sm text-white/60">Geospatial Analytics for Real-time Unified Data & Action.</p>
        </div>
        <div>
          <div className="font-semibold text-white">Produk</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a href="#fitur">Fitur</a></li>
            <li><a href="#harga">Harga</a></li>
            <li><Link to="/wizard">Demo</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white">Perusahaan</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Tentang</li><li>Karir</li><li>Privasi</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white">Kontak</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li>hello@garuda.id</li><li>+62 21 5000 0000</li><li>Jakarta, Indonesia</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t border-white/10 px-4 pt-6 text-xs text-white/40">
        © {new Date().getFullYear()} GARUDA. Mock prototype untuk demo. Semua data fiktif.
      </div>
    </footer>
  );
}
