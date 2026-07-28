# 💰 SakuKu - Aplikasi Pencatat Keuangan Pribadi

[![React](https://img.shields.io/badge/Frontend-React%20%28Vite%29-blue)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-cyan)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Backend-Express%20%28Node%29-green)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-purple)](https://www.prisma.io/)
[![MariaDB](https://img.shields.io/badge/Database-MariaDB-orange)](https://mariadb.org/)
[![JWT](https://img.shields.io/badge/Auth-JWT-red)](https://jwt.io/)

**SakuKu** adalah aplikasi web dasbor keuangan personal (_personal finance tracker_) modern berarsitektur **Monorepo** (Frontend & Backend berada dalam satu repositori). Aplikasi ini dirancang untuk memudahkan pengguna melacak alur uang masuk (_income_) dan uang keluar (_expense_) secara aman, presisi, dan terorganisir.

---

## 🎨 Tampilan & Fitur Utama Dasbor

- **🔒 Sistem Keamanan & Multi-Akun (JWT):** Registrasi khusus menggunakan domain resmi `@sakuku.com`. Setiap akun memiliki ruang simpan terisolasi sehingga catatan keuangan tidak akan bercampur.
- **💰 Kalkulator Saldo Real-Time:** Menghitung saldo bersih (_Net Balance_), total pemasukan, dan total pengeluaran secara presisi dengan dukungan nilai desimal (_Float_).
- **📈 Grafik Tren Keuangan Harian (Line Chart):** Visualisasi garis interaktif berbasis **Recharts** untuk membandingkan pergerakan uang masuk (Hijau) dan uang keluar (Merah) per tanggal secara _side-by-side_.
- **📅 Lini Masa Terkelompok (Date Grouping):** Catatan riwayat transaksi disusun dan dikelompokkan secara vertikal berdasarkan hari/tanggal kronologis (`createdAt`).
- **🚀 Performa Cepat & Bebas Lag:** Dioptimalkan dengan _Lazy State Initialization_ pada React untuk menghindari _cascading re-renders_ saat membaca sesi login.

---

## 🏗️ Arsitektur Proyek (Struktur Monorepo)

Proyek ini dipisahkan menjadi dua sektor mandiri untuk mempermudah pemeliharaan dan skalabilitas kode:

1. **`/frontend`**: Aplikasi _Single Page Application_ (SPA) berbasis **React, Vite, dan Tailwind CSS** yang menangani semua antarmuka pengguna, form registrasi/login, dan grafik statistik.
2. **`/backend`**: RESTful API berbasis **Node.js, Express, dan Prisma ORM** yang mengelola data di **MariaDB**, enkripsi password (`bcryptjs`), dan autentikasi token JWT.

```text
sakuku/
├── backend/               # 🚂 Server REST API & Database
│   ├── prisma/            # Schema database & migrasi MariaDB
│   ├── src/
│   │   ├── controllers/   # Otak logika (Auth & Transactions)
│   │   ├── middlewares/   # Verifikasi Token JWT
│   │   └── routes/        # Endpoint API (/api/auth & /api/expenses)
│   └── README.md          # Dokumentasi teknis Backend
│
└── frontend/              # 📱 Antarmuka Web App (React)
    ├── src/
    │   ├── components/    # Komponen UI (LineChart, Form, List, Auth)
    │   ├── services/      # Axios Client & Interceptor Session
    │   └── App.jsx        # Root component & State Management
    └── README.md          # Dokumentasi teknis Frontend
```
