// frontend/src/components/ExpenseChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatRupiah } from "../utils/formatCurrency";

export default function ExpenseChart({ transactions }) {
  // 1. Kelompokkan transaksi per tanggal untuk 'income' dan 'expense'
  const dateMap = transactions.reduce((acc, curr) => {
    const rawDate = curr.createdAt || curr.date;
    if (!rawDate) return acc;

    const dateKey = rawDate.split("T")[0];
    if (!acc[dateKey]) {
      acc[dateKey] = { income: 0, expense: 0 };
    }

    const typeStr = (curr.type || "").toString().toLowerCase();
    const amount = Number(curr.amount || 0);

    if (typeStr === "income" || typeStr === "masuk") {
      acc[dateKey].income += amount;
    } else if (typeStr === "expense" || typeStr === "keluar") {
      acc[dateKey].expense += amount;
    }

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

  // 2. Susun data chart dan urutkan berdasarkan tanggal
  const chartData = Object.keys(dateMap)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((dateKey) => ({
      rawDate: dateKey,
      displayDate: formatDateLabel(dateKey),
      income: dateMap[dateKey].income,
      expense: dateMap[dateKey].expense,
    }));

  const formatYAxis = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}jt`;
    if (value >= 1000) return `${Math.round(value / 1000)}rb`;
    return value;
  };

  if (chartData.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col justify-center items-center text-slate-400 dark:text-slate-500 py-12 transition-colors">
        <p className="text-3xl mb-2">📈</p>
        <p className="text-sm">Belum ada data keuangan untuk dianalisis.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col transition-colors">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          Tren Keuangan Harian
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Garis perbandingan pergerakan uang masuk dan keluar dari waktu ke
          waktu.
        </p>
      </div>

      <div className="w-full h-72 mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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

            <Tooltip
              formatter={(value, name) => [
                formatRupiah(value),
                name === "income" ? "Uang Masuk" : "Uang Keluar",
              ]}
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

            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: "10px", fontSize: "12px" }}
              formatter={(value) => (
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  {value === "income" ? "Uang Masuk" : "Uang Keluar"}
                </span>
              )}
            />

            {/* Garis 1: Uang Masuk (Hijau Emerald dengan Lekukan Mulus) */}
            <Line
              type="monotone"
              name="income"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4, fill: "#10b981" }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />

            {/* Garis 2: Uang Keluar (Merah Rose dengan Lekukan Mulus) */}
            <Line
              type="monotone"
              name="expense"
              dataKey="expense"
              stroke="#f43f5e"
              strokeWidth={3}
              dot={{ r: 4, fill: "#f43f5e" }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
