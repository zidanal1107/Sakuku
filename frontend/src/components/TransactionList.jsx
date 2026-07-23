// frontend/src/components/TransactionList.jsx
import { formatRupiah } from "../utils/formatCurrency";

export default function TransactionList({ transactions, onDelete }) {
  const parseLocalDate = (dateString) => {
    if (!dateString) return null;
    const cleanDate = dateString.split("T")[0];
    const [year, month, day] = cleanDate.split("-").map(Number);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
  };

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

  const isIncome = (type) => {
    if (!type) return false;
    const lower = type.toString().toLowerCase();
    return lower === "income" || lower === "masuk";
  };

  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const rawDate = transaction.createdAt || transaction.date;
    const dateKey = rawDate ? rawDate.split("T")[0] : "Lainnya";
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(transaction);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => {
    if (a === "Lainnya") return 1;
    if (b === "Lainnya") return -1;
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          Riwayat Transaksi
        </h3>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md">
          {transactions.length} Total Catatan
        </span>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-12 text-slate-400 dark:text-slate-500">
          <p className="text-3xl mb-2">🍃</p>
          <p className="text-sm">
            Belum ada catatan keuangan. Yuk, catat sekarang!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedDates.map((dateKey) => {
            const listInGroup = groupedTransactions[dateKey];

            const totalMasuk = listInGroup
              .filter((t) => isIncome(t.type))
              .reduce((sum, t) => sum + Number(t.amount || 0), 0);

            const totalKeluar = listInGroup
              .filter((t) => !isIncome(t.type))
              .reduce((sum, t) => sum + Number(t.amount || 0), 0);

            return (
              <div
                key={dateKey}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-700 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 shadow-2xs">
                      {formatDateHeader(dateKey)}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                      ({listInGroup.length})
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold self-end sm:self-auto">
                    {totalMasuk > 0 && (
                      <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/60 px-2 py-0.5 rounded">
                        Masuk: +{formatRupiah(totalMasuk)}
                      </span>
                    )}
                    {totalKeluar > 0 && (
                      <span className="text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border border-rose-200/60 dark:border-rose-800/60 px-2 py-0.5 rounded">
                        Keluar: -{formatRupiah(totalKeluar)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                    <thead>
                      <tr className="text-slate-400 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200/60 dark:border-slate-700/60">
                        <th className="pb-2 w-2/5">Transaksi</th>
                        <th className="pb-2 w-1/5">Tipe</th>
                        <th className="pb-2 w-1/5">Kategori</th>
                        <th className="pb-2 w-1/5 text-right">Nominal</th>
                        <th className="pb-2 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/50 font-medium">
                      {listInGroup.map((t) => {
                        const isMasuk = isIncome(t.type);

                        return (
                          <tr
                            key={t.id}
                            className="hover:bg-slate-100/50 dark:hover:bg-slate-700/30 transition-colors"
                          >
                            <td className="py-3 pr-2">
                              <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm line-clamp-1">
                                {t.title}
                              </p>
                            </td>
                            <td className="py-3">
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                  isMasuk
                                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                                    : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
                                }`}
                              >
                                {isMasuk ? "Masuk" : "Keluar"}
                              </span>
                            </td>
                            <td className="py-3">
                              <span className="px-2.5 py-0.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs rounded-full">
                                {t.category}
                              </span>
                            </td>
                            <td
                              className={`py-3 text-right font-bold text-sm ${isMasuk ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                            >
                              {isMasuk ? "+" : "-"} {formatRupiah(t.amount)}
                            </td>
                            <td className="py-3 text-center">
                              <button
                                onClick={() => onDelete(t.id)}
                                className="text-xs text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 font-semibold px-2 py-1 rounded hover:bg-rose-100/50 dark:hover:bg-rose-950/50 transition-colors"
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
