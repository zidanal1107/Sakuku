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
  // 1. Filter transaksi hanya untuk tipe pengeluaran ('expense')
  const expenseTransactions = transactions.filter(
    (t) =>
      t.type &&
      (t.type.toString().toLowerCase() === "expense" ||
        t.type.toString().toLowerCase() === "keluar"),
  );

  // 2. Kelompokkan total pengeluaran per tanggal (YYYY-MM-DD)
  const dateMap = expenseTransactions.reduce((acc, curr) => {
    const rawDate = curr.createdAt || curr.date;
    if (!rawDate) return acc;

    // Ambil string format YYYY-MM-DD
    const dateKey = rawDate.split("T")[0];
    acc[dateKey] = (acc[dateKey] || 0) + Number(curr.amount || 0);
    return acc;
  }, {});

  // Helper untuk memformat tanggal singkat di Sumbu X (Contoh: "23 Jul")
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

  // 3. Ubah objek ke format Array & urutkan dari tanggal paling lama ke paling baru (kronologis)
  const chartData = Object.keys(dateMap)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((dateKey) => ({
      rawDate: dateKey,
      displayDate: formatDateLabel(dateKey),
      totalAmount: dateMap[dateKey],
    }));

  // Helper penyederhana angka nominal di Sumbu Y (misal: 50000 -> 50rb)
  const formatYAxis = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}jt`;
    if (value >= 1000) return `${Math.round(value / 1000)}rb`;
    return value;
  };

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col justify-center items-center text-slate-400 py-12">
        <p className="text-3xl mb-2">📊</p>
        <p className="text-sm">Belum ada data pengeluaran untuk dianalisis.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">Pengeluaran Harian</h3>
        <p className="text-xs text-slate-400">
          Statistik total pengeluaran Anda per tanggal.
        </p>
      </div>

      <div className="w-full h-64 mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            {/* Garis grid latar belakang */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />

            {/* Sumbu X (Bawah) - Tanggal */}
            <XAxis
              dataKey="displayDate"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />

            {/* Sumbu Y (Samping) - Nominal */}
            <YAxis
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
            />

            {/* Pop-up Info Detail saat Bar Ditekan / Hover */}
            <Tooltip
              formatter={(value) => [formatRupiah(value), "Total Keluar"]}
              labelFormatter={(label, payload) => {
                if (payload && payload.length) {
                  return `Tanggal: ${payload[0].payload.rawDate}`;
                }
                return label;
              }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                fontSize: "12px",
              }}
            />

            {/* Batang Diagram */}
            <Bar
              dataKey="totalAmount"
              fill="#f43f5e" // Warna merah rose modern
              radius={[6, 6, 0, 0]} // Sudut membulat di bagian atas batang
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
