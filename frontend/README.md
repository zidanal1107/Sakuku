# 📱 SakuKu Frontend - V1

Selamat datang di repositori _frontend_ **SakuKu**, sebuah aplikasi dasbor pencatat keuangan personal yang modern, bersih, dan interaktif. SakuKu membantu pengguna melacak uang masuk (_income_) dan uang keluar (_expense_) secara real-time dengan visualisasi data yang informatif.

---

## ✨ Fitur Utama (V1)

- **Dasbor Ringkasan Keuangan**: Menampilkan total saldo bersih (Net), total uang masuk, dan total uang keluar dalam format Rupiah (`Rp`).
- **Visualisasi Grafik Donat (Pie Chart)**: Grafik interaktif yang mengelompokkan pengeluaran berdasarkan kategori menggunakan pustaka Recharts.
- **Formulir Transaksi Pintar**: Input data otomatis mendeteksi angka desimal (_Float_) dan tipe data (_income/expense_) yang diselaraskan dengan backend.
- **Lini Masa Transaksi (Date Grouping)**: Riwayat transaksi otomatis dikelompokkan berdasarkan tanggal transaksi secara kronologis (dari yang terbaru ke terlama).
- **Arsitektur Kebal Case-Sensitive**: Frontend dilengkapi fungsi pengaman untuk menyamakan data backend (_case-insensitive_) agar terhindar dari masalah _white screen_.

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: [React.js](https://react.dev/) (Vite sebagai build tool)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework)
- **Grafik/Charts**: [Recharts](https://recharts.org/) (Composability chart library untuk React)
- **HTTP Client**: [Axios](https://axios-http.com/) (Untuk komunikasi data dengan API Backend)

---

## 📁 Struktur Folder Utama

```text
frontend/
├── src/
│   ├── components/
│   │   ├── ExpenseChart.jsx      # Komponen Pie Chart Recharts
│   │   ├── TransactionForm.jsx   # Formulir tambah data keuangan
│   │   └── TransactionList.jsx   # Tabel riwayat terkelompok per tanggal
│   ├── hooks/
│   │   └── useTransactions.js    # Custom Hook pengelola state & API Axios
│   ├── utils/
│   │   └── formatCurrency.js     # Fungsi helper format Rupiah (IDR)
│   ├── services/
│   │   └── api.js                # Konfigurasi dasar Axios (Base URL)
│   ├── App.jsx                   # Komponen utama & kalkulator matematika saldo
│   └── main.jsx                  # Root entry point React
├── package.json
└── README.md
```
