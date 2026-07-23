// frontend/src/components/TransactionForm.jsx
import { useState } from "react";

export default function TransactionForm({ onAddTransaction }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("Gaji");

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddTransaction({
      title,
      amount: parseFloat(amount),
      type,
      category,
    });

    setTitle("");
    setAmount("");
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
        Tambah Catatan
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Judul Transaksi */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
            Judul Transaksi
          </label>
          <input
            type="text"
            placeholder="Beli kopi susu / Bonus projek"
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Nominal & Tipe */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
              Nominal (Rp)
            </label>
            <input
              type="number"
              step="any"
              placeholder="0"
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
              Tipe
            </label>
            <select
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="income">Uang Masuk</option>
              <option value="expense">Uang Keluar</option>
            </select>
          </div>
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
            Kategori
          </label>
          <select
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Gaji">Gaji / Pendapatan</option>
            <option value="Makanan">Makanan & Minuman</option>
            <option value="Transportasi">Transportasi</option>
            <option value="Hiburan">Hiburan / Belanja</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        {/* Tombol Simpan */}
        <button
          type="submit"
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm mt-2"
        >
          Simpan Transaksi
        </button>
      </form>
    </div>
  );
}
