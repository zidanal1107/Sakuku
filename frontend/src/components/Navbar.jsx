// frontend/src/components/Navbar.jsx
import { useTheme } from "../context/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo SakuKu */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white text-xl shadow-sm shadow-emerald-200 dark:shadow-none">
            💰
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
            SakuKu
          </span>
        </div>

        {/* Akses Kanan: Toggle Theme & Profil Pengguna */}
        <div className="flex items-center gap-4">
          {/* Tombol Toggle Theme */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-xs font-semibold flex items-center gap-2 border border-slate-200/60 dark:border-slate-700"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700"></div>

          {/* Status Pengguna */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                Selamat datang,
              </p>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Pengguna Setia
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-medium text-slate-600 dark:text-slate-300 text-xs">
              U
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
