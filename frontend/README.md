# 📱 SakuKu Frontend - V1.5

Selamat datang di repositori _frontend_ **SakuKu**, dasbor pencatat keuangan pribadi modern, interaktif, dan aman. Aplikasi ini dibangun dengan React untuk memberikan pengalaman mengelola keuangan secara _real-time_ dengan antarmuka yang ramah pengguna.

---

## ✨ Fitur Utama (Terbaru)

- **Sistem Autentikasi User (JWT)**: Form Login & Register terintegrasi dengan validasi khusus domain email `@sakuku.com`.
- **Inisialisasi Sesi Cepat & Efisien**: Menggunakan _Lazy Initial State_ untuk membaca sesi pengguna dari `localStorage` tanpa memicu _cascading re-renders_.
- **Dasbor Ringkasan Keuangan**: Menampilkan total saldo bersih (Net Balance), total uang masuk, dan total uang keluar dalam format Rupiah (`Rp`).
- **Visualisasi Tren Keuangan Harian (Line Chart)**: Grafik garis interaktif menggunakan Recharts untuk membandingkan pergerakan uang masuk (Hijau) dan uang keluar (Merah) per tanggal.
- **Formulir Transaksi Pintar**: Formulir pencatatan yang mudah dipahami dengan konversi otomatis ke format nilai nominal backend.
- **Lini Masa Transaksi Terkelompok**: Riwayat transaksi yang dikelompokkan secara otomatis berdasarkan hari/tanggal kronologis.
- **Manajemen Sesi Otomatis**: Dilengkapi Axios Interceptor yang otomatis membersihkan sesi dan melakukan _redirect_ ke halaman Login jika token JWT kadaluwarsa.

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: [React.js](https://react.dev/) (menggunakan Vite sebagai _build tool_)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Visualisasi Data**: [Recharts](https://recharts.org/) (Komponen LineChart, Line, XAxis, YAxis, Tooltip, Legend)
- **HTTP Client**: [Axios](https://axios-http.com/) (Komunikasi API dengan Interceptor Token Bearer)

---

## 📁 Struktur Folder Frontend

```text
frontend/
├── src/
│   ├── components/
│   │   ├── ExpenseChart.jsx      # Komponen Line Chart Perbandingan Harian
│   │   ├── TransactionForm.jsx   # Formulir penambahan transaksi baru
│   │   ├── TransactionList.jsx   # Tabel riwayat terkelompok per tanggal
│   │   ├── Login.jsx             # Form Login pengguna
│   │   ├── Register.jsx          # Form Registrasi akun baru (@sakuku.com)
│   │   └── Navbar.jsx            # Bar navigasi & tombol Logout
│   ├── hooks/
│   │   └── useTransactions.js    # Custom Hook pengelola state & request API
│   ├── services/
│   │   └── api.js                # Konfigurasi Axios Base URL & Interceptor Auth
│   ├── utils/
│   │   └── formatCurrency.js     # Helper format angka ke mata uang Rupiah (IDR)
│   ├── App.jsx                   # Komponen Utama, Manajemen Router/Auth, & State Keuangan
│   └── main.jsx                  # Root Entry Point React
├── package.json
└── README.md
```
