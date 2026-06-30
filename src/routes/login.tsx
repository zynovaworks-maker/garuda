import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { roles } from "@/lib/mock-data";
import { toast } from "sonner";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Masuk — GARUDA" }, { name: "description", content: "Demo login ke dashboard GARUDA." }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@garuda.id");
  const [password, setPassword] = useState("demo1234");
  const [role, setRole] = useState("Super Admin");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      try { localStorage.setItem("garuda_session", JSON.stringify({ email, role, ts: Date.now() })); } catch {}
      toast.success(`Selamat datang, ${role}`);
      navigate({ to: "/app" });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-hero text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden flex-col justify-between p-10 lg:flex">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative z-10">
            <Link to="/"><Logo className="text-white" /></Link>
          </div>
          <div className="relative z-10 max-w-md">
            <ShieldCheck className="h-10 w-10 text-gold" />
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight">
              Command Center untuk Kampanye Modern Indonesia.
            </h2>
            <p className="mt-3 text-white/70">
              Auditable, transparan, dan berbasis data. Semua keputusan strategis ada di satu layar.
            </p>
            <p className="mt-6 font-display text-sm italic text-gold/90">"Memetakan Dukungan, Mengukur Kemenangan"</p>
          </div>
          <div className="relative z-10 text-xs text-white/40">
            © {new Date().getFullYear()} GARUDA · Prototype Demo
          </div>
        </div>

        <div className="flex items-center justify-center bg-background p-6 text-foreground lg:p-10">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Kembali ke beranda
            </Link>
            <div className="lg:hidden mb-6"><Logo /></div>
            <h1 className="text-2xl font-bold">Masuk ke GARUDA</h1>
            <p className="mt-1 text-sm text-muted-foreground">Demo login — pilih role untuk preview dashboard.</p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div>
                <Label>Role Preview</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {roles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                {loading ? "Memuat…" : "Masuk Demo"}
              </Button>
            </form>

            <Card className="mt-6 border-dashed bg-muted/40 p-3 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Demo mode:</span> tidak ada autentikasi nyata. Semua data adalah dummy untuk preview.
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
