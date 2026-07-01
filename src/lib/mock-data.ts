export const KPI = {
  totalPemilih: 1_248_530,
  totalPendukung: 612_402,
  relawanAktif: 4_812,
  jumlahTPS: 3_240,
  targetSuara: 720_000,
  progressTarget: 85,
  danaTerpakai: 4.2,
  prediksiKemenangan: 62,
};

export const elektabilitasTrend = [
  { bulan: "Jan", kandidat: 28, lawan1: 24, lawan2: 18 },
  { bulan: "Feb", kandidat: 31, lawan1: 25, lawan2: 19 },
  { bulan: "Mar", kandidat: 35, lawan1: 26, lawan2: 17 },
  { bulan: "Apr", kandidat: 38, lawan1: 24, lawan2: 18 },
  { bulan: "Mei", kandidat: 42, lawan1: 23, lawan2: 17 },
  { bulan: "Jun", kandidat: 46, lawan1: 22, lawan2: 16 },
  { bulan: "Jul", kandidat: 49, lawan1: 21, lawan2: 15 },
];

export const aktivitasRelawan = [
  { hari: "Sen", kunjungan: 420, sosialisasi: 280 },
  { hari: "Sel", kunjungan: 510, sosialisasi: 320 },
  { hari: "Rab", kunjungan: 480, sosialisasi: 360 },
  { hari: "Kam", kunjungan: 620, sosialisasi: 410 },
  { hari: "Jum", kunjungan: 720, sosialisasi: 480 },
  { hari: "Sab", kunjungan: 880, sosialisasi: 590 },
  { hari: "Min", kunjungan: 760, sosialisasi: 510 },
];

export const targetSuaraDonut = [
  { name: "Tercapai", value: 612, fill: "var(--color-gold)" },
  { name: "Sisa Target", value: 108, fill: "var(--color-muted)" },
];

export const wilayahPotensial = [
  { nama: "Kec. Tanjung Priok", potensi: 92, pendukung: 48200, tps: 184 },
  { nama: "Kec. Cilincing", potensi: 88, pendukung: 41300, tps: 162 },
  { nama: "Kec. Koja", potensi: 84, pendukung: 38900, tps: 148 },
  { nama: "Kec. Pademangan", potensi: 79, pendukung: 32100, tps: 121 },
  { nama: "Kec. Kelapa Gading", potensi: 75, pendukung: 29400, tps: 110 },
];

export const tpsRawan = [
  { tps: "TPS 023 — Kel. Sunter Agung", status: "Rawan Tinggi", isu: "Distribusi logistik terlambat" },
  { tps: "TPS 145 — Kel. Warakas", status: "Rawan Sedang", isu: "Saksi belum lengkap" },
  { tps: "TPS 087 — Kel. Tugu Utara", status: "Rawan Sedang", isu: "Akses sinyal lemah" },
  { tps: "TPS 211 — Kel. Marunda", status: "Rawan Tinggi", isu: "Riwayat sengketa 2019" },
];

export const leaderboardKorlap = [
  { nama: "Budi Santoso", wilayah: "Tanjung Priok", skor: 982, kunjungan: 412 },
  { nama: "Siti Aminah", wilayah: "Cilincing", skor: 941, kunjungan: 389 },
  { nama: "Agus Rahman", wilayah: "Koja", skor: 902, kunjungan: 358 },
  { nama: "Dewi Lestari", wilayah: "Pademangan", skor: 871, kunjungan: 342 },
  { nama: "Hendra Wijaya", wilayah: "Kelapa Gading", skor: 845, kunjungan: 327 },
];

export const featureModules = [
  { kode: "MAP", nama: "GARUDA MAP", desc: "GIS mapping wilayah & TPS dengan heatmap dukungan", icon: "Map", color: "teal" },
  { kode: "VOTE", nama: "GARUDA VOTE", desc: "Manajemen DPT, pendukung, dan survey elektabilitas", icon: "Vote", color: "gold" },
  { kode: "FORCE", nama: "GARUDA FORCE", desc: "Manajemen korlap & relawan dengan GPS attendance", icon: "Users", color: "orange" },
  { kode: "FUND", nama: "GARUDA FUND", desc: "Intelijen keuangan kampanye & ROI politik", icon: "Wallet", color: "teal" },
  { kode: "VERIFY", nama: "GARUDA VERIFY", desc: "Verifikasi hasil TPS dan upload Form C1", icon: "ShieldCheck", color: "gold" },
  { kode: "WAR ROOM", nama: "GARUDA WAR ROOM", desc: "Command center real-time untuk hari H pemilu", icon: "Radar", color: "orange" },
  { kode: "REPORT", nama: "GARUDA REPORT", desc: "Analytics & laporan dalam PDF / Excel", icon: "FileBarChart", color: "teal" },
  { kode: "ADMIN", nama: "GARUDA ADMIN", desc: "RBAC, audit log, dan pengaturan organisasi", icon: "Settings", color: "gold" },
];

export const pricingTiers = [
  { nama: "Pilkades", harga: "Rp 30 – 50 Juta", desc: "Skala desa, hingga 50 TPS", fitur: ["GARUDA Lite", "Manajemen relawan dasar", "Quick count"] },
  { nama: "DPRD Kab/Kota", harga: "Rp 100 – 150 Juta", desc: "Skala kabupaten/kota", fitur: ["GARUDA Professional", "GIS Mapping", "Real count"] },
  { nama: "DPRD Provinsi", harga: "Rp 200 – 250 Juta", desc: "Skala provinsi", fitur: ["GARUDA Professional", "War Room", "Approval finance"] },
  { nama: "Pilkada", harga: "Rp 300 – 350 Juta", desc: "Kabupaten / Kota", fitur: ["GARUDA Enterprise", "Full GIS", "Dedicated war room"] },
  { nama: "Pilgub", harga: "Rp 400 – 500 Juta", desc: "Tingkat provinsi", fitur: ["GARUDA Enterprise", "Multi-region", "24/7 support"] },
];

export const addOns = [
  { nama: "Training Tim Sukses", icon: "GraduationCap" },
  { nama: "GIS Mapping", icon: "MapPin" },
  { nama: "Data Processing", icon: "Database" },
  { nama: "Election Day War Room", icon: "Radio" },
  { nama: "Dashboard Custom", icon: "LayoutDashboard" },
  { nama: "Political Data Consulting", icon: "Briefcase" },
];

export const roadmap = [
  { phase: "Phase 1", nama: "Foundation", desc: "Setup data dasar, struktur organisasi, dan onboarding tim" },
  { phase: "Phase 2", nama: "Campaign Management", desc: "Aktivasi modul VOTE, FORCE, dan penugasan wilayah" },
  { phase: "Phase 3", nama: "Financial & Verification", desc: "Aktivasi FUND, approval flow, dan VERIFY TPS" },
  { phase: "Phase 4", nama: "Intelligence & War Room", desc: "Real-time analytics, heatmap, dan komando lapangan" },
  { phase: "Phase 5", nama: "Launch Preparation", desc: "Simulasi hari H, quick count, dan rekapitulasi" },
];

export const roles = [
  "Super Admin", "Kandidat", "Campaign Manager", "Korlap", "Relawan", "Finance", "Verifikator TPS",
];

export const electionTypes = [
  { kode: "pilkades", nama: "Pilkades", desc: "Pemilihan Kepala Desa", hierarchy: ["Desa", "TPS", "Korlap", "Relawan"] },
  { kode: "pileg-kab", nama: "Pileg DPRD Kab/Kota", desc: "Tingkat Kabupaten/Kota", hierarchy: ["Kabupaten/Kota", "Kecamatan", "Desa/Kelurahan", "TPS"] },
  { kode: "pileg-prov", nama: "Pileg DPRD Provinsi", desc: "Tingkat Provinsi", hierarchy: ["Provinsi", "Kabupaten/Kota", "Kecamatan", "TPS"] },
  { kode: "pileg-ri", nama: "Pileg DPR RI", desc: "Tingkat Nasional Dapil", hierarchy: ["Dapil", "Kabupaten/Kota", "Kecamatan", "TPS"] },
  { kode: "pilkada", nama: "Pilkada", desc: "Bupati / Walikota", hierarchy: ["Kabupaten/Kota", "Kecamatan", "Desa/Kelurahan", "TPS"] },
  { kode: "pilgub", nama: "Pilgub", desc: "Gubernur Provinsi", hierarchy: ["Provinsi", "Kabupaten/Kota", "Kecamatan", "Desa/Kelurahan", "TPS"] },
];

export const packages = [
  { nama: "GARUDA Lite", harga: "Rp 30 – 80 Juta", fitur: ["GARUDA MAP (basic)", "GARUDA VOTE", "GARUDA FORCE", "Quick count"], cocok: "Pilkades, Pileg lokal" },
  { nama: "GARUDA Professional", harga: "Rp 100 – 250 Juta", fitur: ["Semua fitur Lite", "GARUDA FUND", "GARUDA VERIFY", "WAR ROOM standar", "GIS Mapping penuh"], cocok: "DPRD Kab/Kota, Provinsi" },
  { nama: "GARUDA Enterprise", harga: "Rp 300 – 500 Juta", fitur: ["Semua fitur Professional", "WAR ROOM dedicated", "Custom dashboard", "Konsultan politik", "24/7 priority"], cocok: "Pilkada, Pilgub" },
];

export const strategies = [
  { kode: "door", nama: "Door to Door", desc: "Kunjungan langsung rumah ke rumah", icon: "DoorOpen" },
  { kode: "berjenjang", nama: "Korlap Berjenjang", desc: "Struktur piramida koordinator", icon: "Network" },
  { kode: "komunitas", nama: "Komunitas", desc: "Penetrasi via komunitas & majelis", icon: "Users" },
  { kode: "partai", nama: "Partai Politik", desc: "Mobilisasi struktur partai", icon: "Flag" },
  { kode: "hybrid", nama: "Hybrid Campaign", desc: "Kombinasi digital + lapangan", icon: "Zap" },
];

// DPT
export const dptSample = Array.from({ length: 28 }).map((_, i) => ({
  id: `NIK-${(3174010000 + i).toString()}`,
  nama: ["Ahmad Fauzi","Siti Nurhaliza","Budi Hartono","Dewi Anggraini","Rudi Hermawan","Fitri Yulianti","Andi Wijaya","Lina Marlina","Joko Susilo","Maya Sari"][i % 10] + " " + (i+1),
  alamat: ["Jl. Mawar","Jl. Melati","Jl. Kenanga","Jl. Anggrek","Jl. Cempaka"][i % 5] + " No. " + (i+12),
  tps: `TPS ${String(((i * 7) % 240) + 1).padStart(3, "0")}`,
  kelurahan: ["Sunter Agung","Warakas","Tugu Utara","Marunda","Kebon Bawang"][i % 5],
  status: (["Pendukung","Swing","Belum Dipetakan","Pendukung","Pendukung"][i % 5]) as "Pendukung" | "Swing" | "Belum Dipetakan",
}));

export const transaksiKeuangan = Array.from({ length: 14 }).map((_, i) => ({
  id: `TRX-${1000 + i}`,
  tanggal: `2026-0${(i % 6) + 1}-${String((i*3 % 28) + 1).padStart(2,"0")}`,
  kategori: ["Operasional","Logistik","Program Wilayah","Atribut","Konsultan","Saksi"][i % 6],
  deskripsi: ["Sewa posko","Cetak APK","Sosialisasi kecamatan","Konsumsi relawan","Honor saksi TPS","Mobilisasi"][i % 6],
  jumlah: (i + 1) * 12_500_000,
  tipe: i % 3 === 0 ? "Pemasukan" : "Pengeluaran",
  status: (["Approved","Pending","Approved","Approved","Pending"][i % 5]) as "Approved" | "Pending" | "Rejected",
}));

export const donatur = [
  { nama: "PT Bumi Sejahtera", komitmen: 500_000_000, tipe: "Korporasi" },
  { nama: "Ir. H. Suryanto", komitmen: 250_000_000, tipe: "Individu" },
  { nama: "Yayasan Cendekia", komitmen: 150_000_000, tipe: "Yayasan" },
  { nama: "Komunitas UMKM Pesisir", komitmen: 75_000_000, tipe: "Komunitas" },
];

export const kontrakSuara = [
  { id: "KS-001", wilayah: "Tanjung Priok", target: 62000, aktual: 48200, anggaran: 760_000_000, penanggungJawab: "Budi Santoso", status: "On Track" },
  { id: "KS-002", wilayah: "Cilincing", target: 54000, aktual: 41300, anggaran: 690_000_000, penanggungJawab: "Siti Aminah", status: "Perlu Dorongan" },
  { id: "KS-003", wilayah: "Koja", target: 47000, aktual: 38900, anggaran: 610_000_000, penanggungJawab: "Agus Rahman", status: "On Track" },
  { id: "KS-004", wilayah: "Pademangan", target: 42000, aktual: 32100, anggaran: 540_000_000, penanggungJawab: "Dewi Lestari", status: "At Risk" },
];

export const verifikasiTPS = Array.from({ length: 12 }).map((_, i) => ({
  id: `C1-${2000 + i}`,
  tps: `TPS ${String(i+1).padStart(3,"0")}`,
  kelurahan: ["Sunter Agung","Warakas","Tugu Utara","Marunda"][i % 4],
  perolehan: { kandidat: 180 + i*7, lawan1: 120 + i*4, lawan2: 90 + i*3 },
  status: (["Menunggu","Perlu Review","Terverifikasi","Ditolak","Terverifikasi","Menunggu"][i % 6]) as "Menunggu" | "Perlu Review" | "Terverifikasi" | "Ditolak",
  saksi: ["Andi","Rina","Budi","Sari"][i % 4],
}));

export const users = [
  { nama: "Rudi Hartono", email: "rudi@garuda.id", role: "Super Admin", status: "Aktif" },
  { nama: "Sinta Wulandari", email: "sinta@garuda.id", role: "Campaign Manager", status: "Aktif" },
  { nama: "Bayu Pratama", email: "bayu@garuda.id", role: "Korlap", status: "Aktif" },
  { nama: "Mega Putri", email: "mega@garuda.id", role: "Finance", status: "Aktif" },
  { nama: "Eko Saputra", email: "eko@garuda.id", role: "Verifikator TPS", status: "Nonaktif" },
  { nama: "Tina Marlina", email: "tina@garuda.id", role: "Relawan", status: "Aktif" },
];

export const auditLog = [
  { waktu: "2026-06-30 09:42", aktor: "Sinta W.", aksi: "Approve pencairan dana TRX-1004", kategori: "Finance" },
  { waktu: "2026-06-30 09:15", aktor: "Bayu P.", aksi: "Update lokasi 18 relawan via GPS", kategori: "Force" },
  { waktu: "2026-06-30 08:58", aktor: "Eko S.", aksi: "Verifikasi C1-2007 (Disetujui)", kategori: "Verify" },
  { waktu: "2026-06-30 08:22", aktor: "Rudi H.", aksi: "Tambah user 'Tina Marlina' (Relawan)", kategori: "Admin" },
  { waktu: "2026-06-29 21:10", aktor: "Sistem", aksi: "Backup database otomatis berhasil", kategori: "System" },
];
