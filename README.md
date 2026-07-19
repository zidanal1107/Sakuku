# 💰 SakuKu - Aplikasi Pencatat Keuangan Pribadi

[![React](https://img.shields.io/badge/Frontend-React%20%28Vite%29-blue)](https://react.dev/)
[![Express](https://img.shields.io/badge/Backend-Express%20%28Node%29-green)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-purple)](https://www.prisma.io/)
[![MariaDB](https://img.shields.io/badge/Database-MariaDB-orange)](https://mariadb.org/)

**SakuKu** adalah aplikasi web dasbor keuangan personal (_personal finance tracker_) modern berbentuk **Monorepo** (Frontend dan Backend berada dalam satu repositori). Aplikasi ini dirancang untuk memudahkan pengguna melacak alur uang masuk (_income_) dan uang keluar (_expense_) secara presisi dan terorganisir.

---

## 🎨 Tampilan Utama Dasbor V1

- **Total Kring-Kring (Kalkulator Saldo):** Menghitung sisa bersih (Net), total pemasukan, dan pengeluaran secara otomatis dengan tipe data _Float_.
- **Lini Masa Lapis Garis (Date Grouping):** Catatan riwayat keuangan otomatis diurutkan dan dikelompokkan secara vertikal berdasarkan hari/tanggal (`createdAt`).
- **Grafik Pai Interaktif:** Diagram lingkaran dinamis berbasis **Recharts** untuk mendeteksi persentase kategori pengeluaran terbesar secara visual.

---

## 🏗️ Arsitektur Proyek (Struktur Monorepo)

Proyek ini dipisahkan menjadi dua sektor mandiri untuk mempermudah pemeliharaan kode:

1.  **`/frontend`**: Aplikasi _Single Page Application_ (SPA) berbasis React dan Tailwind CSS yang fokus pada performa visual yang responsif dan scannable.
2.  **`/backend`**: RESTful API berbasis Node.js/Express yang bertugas menjembatani logika bisnis aplikasi dengan database MariaDB menggunakan Prisma ORM.
