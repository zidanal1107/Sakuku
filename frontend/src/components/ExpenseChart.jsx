// frontend/src/components/ExpenseChart.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatRupiah } from "../utils/formatCurrency";

export default function ExpenseChart({ transactions }) {
  const expenseTransactions = transactions.filter(
    (t) =>
      t.type &&
      (t.type.toString().toLowerCase() === "expense" ||
        t.type.toString().toLowerCase() === "keluar"),
  );

  const dateMap = expenseTransactions.reduce((acc, curr) => {
    const rawDate = curr.createdAt || curr.date;
    if (!rawDate) return acc;
    const dateKey = rawDate.split("T")[0];
    acc[dateKey] = (acc[dateKey] || 0) + Number(curr.amount || 0);
    return acc;
  }, {});

  const formatDateLabel = (dateStr) => {
    try {
      const [year, month, day] = dateStr.split("-").map(Number);
      const dateObj = new Date(year, month - 1, day);
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
      }).format(dateObj);
    } catch {
      return dateStr;
    }
  };

  const chartData = Object.keys(dateMap)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((dateKey) => ({
      rawDate: dateKey,
      displayDate: formatDateLabel(dateKey),
      totalAmount: dateMap[dateKey],
    }));

  const formatYAxis = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}jt`;
    if (value >= 1000) return `${Math.round(value / 1000)}rb`;
    return value;
  };

  if (chartData.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col justify-center items-center text-slate-400 dark:text-slate-500 py-12 transition-colors">
        <p className="text-3xl mb-2">📊</p>
        <p className="text-sm">Belum ada data pengeluaran untuk dianalisis.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col transition-colors">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          Tren Pengeluaran Harian
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Statistik total pengeluaran Anda per tanggal.
        </p>
      </div>

      <div className="w-full h-64 mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#334155"
            />

            <XAxis
              dataKey="displayDate"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />

            <YAxis
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 11 }}
            />

            {/* 📝 Ubah cursor jadi transparent agar area bayangan kolom tidak muncul */}
            <Tooltip
              cursor={{ fill: "transparent" }}
              formatter={(value) => [formatRupiah(value), "Total Keluar"]}
              labelFormatter={(label, payload) => {
                if (payload && payload.length) {
                  return `Tanggal: ${payload[0].payload.rawDate}`;
                }
                return label;
              }}
              contentStyle={{
                backgroundColor: "#0f172a",
                color: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #334155",
                fontSize: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              }}
            />

            {/* 📝 Berikan gaya hover khusus (efek terang/sedikit redup) tepat pada batang saja */}
            <Bar
              dataKey="totalAmount"
              fill="#f43f5e"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
