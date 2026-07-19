// frontend/src/components/ExpenseChart.jsx
// import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function ExpenseChart({ transactions }) {
  // 1. Filter data berdasarkan tipe 'expense' dari database
  const expenseTransactions = transactions.filter(
    t => t.type && t.type.toString().toLowerCase() === 'expense' // 👈 Diganti 'expense'
  );

  // 2. Kelompokkan nominal berdasarkan kategori
  const categoryMap = expenseTransactions.reduce((acc, curr) => {
    const rawCategory = curr.category || 'Lainnya';
    // Menyeragamkan huruf kapital di awal (contoh: "makanan" -> "Makanan")
    const cleanCategory = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase();
    
    acc[cleanCategory] = (acc[cleanCategory] || 0) + Number(curr.amount);
    return acc;
  }, {});

  // 3. Ubah format data agar sesuai kebutuhan Recharts
  const chartData = Object.keys(categoryMap).map(category => ({
    name: category,
    value: categoryMap[category]
  }));

  // Palette warna modern untuk masing-masing kategori pengeluaran
  const COLORS = {
    'Makanan': '#ef4444',       // Merah (Rose-500)
    'Transportasi': '#f59e0b',  // Jingga (Amber-500)
    'Hiburan': '#3b82f6',       // Biru (Blue-500)
    'Lainnya': '#64748b'        // Abu-abu (Slate-500)
  };

  const DEFAULT_COLOR = '#a855f7'; // Ungu jika ada kategori baru

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col justify-center items-center text-slate-400 py-12">
        <p className="text-3xl mb-2">📊</p>
        <p className="text-sm">Belum ada data pengeluaran untuk dianalisis.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
      <h3 className="text-lg font-bold text-slate-800 mb-2">Visualisasi Boros</h3>
      <p className="text-xs text-slate-400 mb-6">Kategori pengeluaran terbesar Anda saat ini.</p>
      
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              innerRadius={60} // Membuat bentuk donut chart agar lebih modern
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[entry.name] || DEFAULT_COLOR} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            <Legend 
              iconType="circle" 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}