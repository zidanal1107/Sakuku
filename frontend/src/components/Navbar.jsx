// frontend/src/components/Navbar.jsx
// import React from 'react';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo SakuKu */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white text-xl shadow-sm shadow-emerald-200">
            💰
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">SakuKu</span>
        </div>
        
        {/* Status Pengguna (Persiapan Fase 3) */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400">Selamat datang,</p>
            <p className="text-sm font-semibold text-slate-700">Pengguna Setia</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-medium text-slate-600">
            U
          </div>
        </div>
      </div>
    </nav>
  );
}