// frontend/src/components/TransactionList.jsx
import { formatRupiah } from '../utils/formatCurrency';

export default function TransactionList({ transactions, onDelete }) {
  
  // 1. Fungsi untuk mempercantik format tanggal header (Contoh: "2026-07-19" -> "Minggu, 19 Juli 2026")
  const formatDateHeader = (dateString) => {
    if (!dateString) return "Tanpa Tanggal";
    try {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch {
      return dateString;
    }
  };

  // 2. Mengelompokkan transaksi berdasarkan tanggal (Y-M-D)
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    // Ambil format YYYY-MM-DD saja dari data date backend
    const date = transaction.date ? transaction.date.split('T')[0] : 'Lainnya';
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});

  // 3. Urutkan tanggal dari yang paling baru ke yang paling lama
  const sortedDates = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Riwayat Transaksi</h3>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-500 rounded-md">
          {transactions.length} Total Catatan
        </span>
      </div>
      
      {transactions.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p className="text-3xl mb-2">🍃</p>
          <p className="text-sm">Belum ada catatan keuangan. Yuk, catat sekarang!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Looping berdasarkan Kelompok Tanggal yang sudah diurutkan */}
          {sortedDates.map((date) => (
            <div key={date} className="space-y-3">
              {/* Batas Penanda Tanggal Hari Ini / Besok / Kemarin */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 shadow-xs whitespace-nowrap">
                  {formatDateHeader(date)}
                </span>
                <div className="w-full h-[1px] bg-slate-100"></div>
              </div>

              {/* Tabel untuk masing-masing kelompok hari */}
              <div className="overflow-x-auto pl-1">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead>
                    <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-50">
                      <th className="pb-2 w-2/5">Transaksi</th>
                      <th className="pb-2 w-1/5">Tipe</th>
                      <th className="pb-2 w-1/5">Kategori</th>
                      <th className="pb-2 w-1/5 text-right">Nominal</th>
                      <th className="pb-2 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-medium">
                    {groupedTransactions[date].map((t) => {
                      const isMasuk = t.type && t.type.toString().toLowerCase() === 'income';
                      
                      return (
                        <tr key={t.id} className="hover:bg-slate-50/40 transition-colors">
                          {/* Nama Transaksi */}
                          <td className="py-3 pr-2">
                            <p className="text-slate-800 font-semibold text-sm line-clamp-1">{t.title}</p>
                          </td>
                          
                          {/* Badge Tipe */}
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                              isMasuk 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                : 'bg-rose-50 text-rose-700 border border-rose-100'
                            }`}>
                              {isMasuk ? 'Masuk' : 'Keluar'}
                            </span>
                          </td>
                          
                          {/* Kategori */}
                          <td className="py-3">
                            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
                              {t.category}
                            </span>
                          </td>
                          
                          {/* Nominal Angka */}
                          <td className={`py-3 text-right font-bold text-sm ${isMasuk ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {isMasuk ? '+' : '-'} {formatRupiah(t.amount)}
                          </td>
                          
                          {/* Aksi Tombol Hapus */}
                          <td className="py-3 text-center">
                            <button 
                              onClick={() => onDelete(t.id)} 
                              className="text-xs text-rose-500 hover:text-rose-700 font-semibold px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}