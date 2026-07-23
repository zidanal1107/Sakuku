// frontend/src/App.jsx
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";

// Mengimpor Custom Hook dan Utilitas Format Rupiah
import { useTransactions } from "./hooks/useTransactions";
import { formatRupiah } from "./utils/formatCurrency";

export default function App() {
  const {
    transactions,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
  } = useTransactions();

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Kalkulasi total keuangan
  const totalMasuk = transactions
    .filter((t) => t.type && t.type.toString().toLowerCase() === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalKeluar = transactions
    .filter((t) => t.type && t.type.toString().toLowerCase() === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalSaldo = totalMasuk - totalKeluar;

  return (
    // 📝 PERBAIKAN: Latar belakang utama disesuaikan untuk mode gelap
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Banner Alert jika terjadi Error Koneksi Backend */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-xl text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Ringkasan Saldo Utama (Kartu-kartu disesuaikan ke mode gelap) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Dompet SakuKu (Net) */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-colors">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Dompet SakuKu (Net)
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
              {loading ? "Menghitung..." : formatRupiah(totalSaldo)}
            </p>
          </div>

          {/* Total Masuk */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-colors">
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Total Masuk
            </p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
              {loading ? "Menghitung..." : formatRupiah(totalMasuk)}
            </p>
          </div>

          {/* Total Keluar */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-colors">
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              Total Keluar
            </p>
            <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-2">
              {loading ? "Menghitung..." : formatRupiah(totalKeluar)}
            </p>
          </div>
        </div>

        {/* Pembagian Grid Layout Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Sisi Kiri: Panel Kontrol Input & Grafik Kategori */}
          <div className="lg:col-span-1 space-y-6">
            <TransactionForm onAddTransaction={addTransaction} />
            <ExpenseChart transactions={transactions} />
          </div>

          {/* Sisi Kanan: Tabel Riwayat Utama */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white dark:bg-slate-900 p-12 text-center text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-colors">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 dark:border-emerald-500 mx-auto mb-4"></div>
                <p className="text-sm">
                  Menghubungkan ke gudang data MariaDB...
                </p>
              </div>
            ) : (
              <TransactionList
                transactions={transactions}
                onDelete={deleteTransaction}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
