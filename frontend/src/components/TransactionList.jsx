// frontend/src/components/TransactionList.jsx
import { formatRupiah } from "../utils/formatCurrency";

export default function TransactionList({ transactions, onDelete }) {
  // 1. Helper parsing tanggal ISO aman dari UTC offset
  const parseLocalDate = (dateString) => {
    if (!dateString) return null;
    const cleanDate = dateString.split("T")[0];
    const [year, month, day] = cleanDate.split("-").map(Number);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
  };

  // 2. Format Header Tanggal (Contoh: "Kamis, 23 Juli 2026")
  const formatDateHeader = (dateKey) => {
    if (dateKey === "Lainnya") return "Tanpa Tanggal";
    try {
      const localDate = parseLocalDate(dateKey);
      if (!localDate) return dateKey;

      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("id-ID", options).format(localDate);
    } catch {
      return dateKey;
    }
  };

  // Helper untuk mengecek apakah transaksi adalah pemasukan
  const isIncome = (type) => {
    if (!type) return false;
    const lower = type.toString().toLowerCase();
    return lower === "income" || lower === "masuk";
  };

  // 3. Kelompokkan transaksi berdasarkan 'createdAt'
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const rawDate = transaction.createdAt || transaction.date;
    const dateKey = rawDate ? rawDate.split("T")[0] : "Lainnya";

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
    return groups;
  }, {});

  // 4. Urutkan tanggal dari yang terbaru ke terlama
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => {
    if (a === "Lainnya") return 1;
    if (b === "Lainnya") return -1;
    return new Date(b).getTime() - new Date(a).getTime();
  });

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
          <p className="text-sm">
            Belum ada catatan keuangan. Yuk, catat sekarang!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Looping berdasarkan Kelompok Tanggal */}
          {sortedDates.map((dateKey) => {
            const listInGroup = groupedTransactions[dateKey];

            // Hitung Total Masuk & Total Keluar untuk TANGGAL INI SAJA
            const totalMasuk = listInGroup
              .filter((t) => isIncome(t.type))
              .reduce((sum, t) => sum + Number(t.amount || 0), 0);

            const totalKeluar = listInGroup
              .filter((t) => !isIncome(t.type))
              .reduce((sum, t) => sum + Number(t.amount || 0), 0);

            return (
              <div
                key={dateKey}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80"
              >
                {/* Header Box Tanggal + Rincian Total Masuk & Keluar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-200 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-2xs">
                      {formatDateHeader(dateKey)}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      ({listInGroup.length})
                    </span>
                  </div>

                  {/* Ringkasan Total Harian */}
                  <div className="flex items-center gap-3 text-xs font-semibold self-end sm:self-auto">
                    {totalMasuk > 0 && (
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                        Masuk: +{formatRupiah(totalMasuk)}
                      </span>
                    )}
                    {totalKeluar > 0 && (
                      <span className="text-rose-700 bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded">
                        Keluar: -{formatRupiah(totalKeluar)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Tabel Transaksi */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead>
                      <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200/60">
                        <th className="pb-2 w-2/5">Transaksi</th>
                        <th className="pb-2 w-1/5">Tipe</th>
                        <th className="pb-2 w-1/5">Kategori</th>
                        <th className="pb-2 w-1/5 text-right">Nominal</th>
                        <th className="pb-2 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/50 font-medium">
                      {listInGroup.map((t) => {
                        const isMasuk = isIncome(t.type);

                        return (
                          <tr
                            key={t.id}
                            className="hover:bg-slate-100/50 transition-colors"
                          >
                            <td className="py-3 pr-2">
                              <p className="text-slate-800 font-semibold text-sm line-clamp-1">
                                {t.title}
                              </p>
                            </td>
                            <td className="py-3">
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                  isMasuk
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                                }`}
                              >
                                {isMasuk ? "Masuk" : "Keluar"}
                              </span>
                            </td>
                            <td className="py-3">
                              <span className="px-2.5 py-0.5 bg-white text-slate-600 border border-slate-200 text-xs rounded-full">
                                {t.category}
                              </span>
                            </td>
                            <td
                              className={`py-3 text-right font-bold text-sm ${isMasuk ? "text-emerald-600" : "text-rose-600"}`}
                            >
                              {isMasuk ? "+" : "-"} {formatRupiah(t.amount)}
                            </td>
                            <td className="py-3 text-center">
                              <button
                                onClick={() => onDelete(t.id)}
                                className="text-xs text-rose-500 hover:text-rose-700 font-semibold px-2 py-1 rounded hover:bg-rose-100/50 transition-colors"
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
            );
          })}
        </div>
      )}
    </div>
  );
}
