// frontend/src/App.jsx
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';

// Mengimpor Custom Hook dan Utilitas Format Rupiah yang sudah kamu buat
import { useTransactions } from './hooks/useTransactions'; 
import { formatRupiah } from './utils/formatCurrency';

export default function App() {
  // Panggil semua state dan fungsi manajemen data langsung dari custom hook
  const { 
    transactions, 
    loading, 
    error, 
    fetchTransactions, 
    addTransaction,
    deleteTransaction // Ditambahkan ke hook untuk melengkapi Fase 1
  } = useTransactions();

  // Picu pengambilan data dari MariaDB saat halaman pertama kali dibuka
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Kalkulasi total keuangan (menggunakan data dinamis dari hook)
  const totalMasuk = transactions
    .filter(t => t.type && t.type.toString().toLowerCase() === 'income') // 👈 Diganti 'income'
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalKeluar = transactions
    .filter(t => t.type && t.type.toString().toLowerCase() === 'expense') // 👈 Diganti 'expense'
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalSaldo = totalMasuk - totalKeluar;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Banner Alert jika terjadi Error Koneksi Backend */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Ringkasan Saldo Utama (Menggunakan utilitas formatRupiah) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dompet SakuKu (Net)</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">
              {loading ? 'Menghitung...' : formatRupiah(totalSaldo)}
            </p>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-emerald-600">Total Masuk</p>
            <p className="text-2xl font-bold text-emerald-600 mt-2">
              {loading ? 'Menghitung...' : formatRupiah(totalMasuk)}
            </p>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-rose-600">Total Keluar</p>
            <p className="text-2xl font-bold text-rose-600 mt-2">
              {loading ? 'Menghitung...' : formatRupiah(totalKeluar)}
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
              <div className="bg-white p-12 text-center text-slate-400 border border-slate-200 rounded-2xl shadow-sm">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                <p className="text-sm">Menghubungkan ke gudang data MariaDB...</p>
              </div>
            ) : (
              <TransactionList transactions={transactions} onDelete={deleteTransaction} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}