# 💰 SakuKu - Aplikasi Pencatat Keuangan Pribadi

**SakuKu** adalah aplikasi web sederhana yang dibuat untuk membantu siapa saja mencatat uang masuk (pemasukan) dan uang keluar (pengeluaran) sehari-hari secara digital. Tidak ada lagi catatan manual di kertas yang gampang hilang!

Aplikasi ini dibangun menggunakan teknologi modern standar industri, namun tetap dibuat sesederhana mungkin agar kodenya rapi dan mudah dirawat.

---

## 🚀 Fitur Utama & Peta Jalan Proyek

Kita membangun aplikasi ini secara bertahap. Berikut adalah status perkembangan SakuKu saat ini:

### 🟢 Fase 1 & 2: Fondasi & Tampilan Pintar (SELESAI ✅)

- **Catat Transaksi:** Memasukkan judul, nominal uang (_Float_), tipe (_income/expense_), dan kategori transaksi.
- **Hitung Saldo Otomatis:** Menampilkan sisa uang bersih (Net), total pemasukan, dan total pengeluaran secara real-time.
- **Lini Masa Terpisah (Date Grouping):** Riwayat transaksi otomatis terpisah berdasarkan hari/tanggal kronologis (`createdAt`) agar rapi.
- **Grafik Pai (Pie Chart):** Visualisasi interaktif menggunakan Recharts untuk melihat kategori pengeluaran apa yang paling dominan.
- **Hapus Data:** Fitur menghapus catatan jika terjadi salah input yang langsung sinkron ke database.

### 🟡 Fase 3: Fitur Keamanan & Multi-Akun (Rencana Selanjutnya ⏳)

- **Kunci Akun (Login):** Setiap pengguna punya akun sendiri (Email & Password) dengan JWT Authentication, sehingga catatan keuangan tidak akan bercampur dengan orang lain.

---

## 🛠️ Teknologi yang Digunakan (Susunan Mesin)

Bagi orang non-IT, bayangkan teknologi ini seperti bagian-bagian dari sebuah mobil:

- **Frontend (React + Vite + Tailwind CSS):** Ini adalah **Body & Dashboard Mobil**. Bagian luar yang dilihat, disentuh, dan digunakan oleh pengguna untuk mengisi formulir dan melihat grafik saldo serta diagram lingkaran.
- **Backend (Node.js + Express):** Ini adalah **Mesin Mobil**. Bagian dalam yang bekerja di balik layar untuk memproses perintah, menerima data dari dashboard, lalu menyalurkannya ke gudang.
- **Database (MariaDB):** Ini adalah **Bagasi/Gudang Penyimpanan**. Tempat fisik aman untuk menyimpan semua data catatan keuangan agar tidak hilang saat mesin komputer dimatikan.
- **ORM (Prisma):** Ini adalah **Asisten Mekanik**. Penerjemah bahasa kode JavaScript ke bahasa database (SQL) menggunakan model `Expense` agar mesin dan bagasi bisa berkomunikasi tanpa ribet.

---

## 📁 Struktur Folder Proyek V1

Koleksi berkas kita dibagi menjadi dua rumah besar yang saling terintegrasi:

```text
sakuku/
├── backend/               # 🚂 RUMAH MESIN (BACKEND)
│   ├── prisma/            # Cetak biru tabel database (schema.prisma) & Migrasi
│   └── src/
│       ├── controllers/   # Otak pemroses logika (CRUD Expense)
│       ├── routes/        # Jalur gerbang API (/api/transactions)
│       └── index.js       # Saklar utama untuk menyalakan server backend
├── frontend/
```
