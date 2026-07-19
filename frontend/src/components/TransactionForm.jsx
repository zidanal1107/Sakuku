// frontend/src/components/TransactionForm.jsx
import { useState } from 'react';

export default function TransactionForm({ onAddTransaction }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  // 📝 DIUBAH: Default value awal disesuaikan dengan teks bahasa Inggris database ('income')
  const [type, setType] = useState('income'); 
  const [category, setCategory] = useState('Gaji');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kirim objek data baru ke custom hook induk
    onAddTransaction({
      title,
      amount: parseFloat(amount),
      type,
      category,
    });

    // Reset formulir input setelah sukses diklik
    setTitle('');
    setAmount('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Tambah Catatan</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Judul Transaksi</label>
          <input 
            type="text" 
            placeholder="Beli kopi susu / Bonus projek" 
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nominal (Rp)</label>
            <input 
              type="number" 
              step="any" // Mengizinkan input angka desimal jika diperlukan oleh tipe Float
              placeholder="0" 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Tipe</label>
            <select 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {/* 📝 DIUBAH: value ditargetkan ke teks inggris 'income' dan 'expense' */}
              <option value="income">Uang Masuk</option>
              <option value="expense">Uang Keluar</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Kategori</label>
          <select 
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-500"
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
        <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm mt-2">
          Simpan Transaksi
        </button>
      </form>
    </div>
  );
}