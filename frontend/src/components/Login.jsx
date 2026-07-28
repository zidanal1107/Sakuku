import { useState } from "react";
import api from "../utils/api"; // Path menyesuaikan konfigurasi Axios Interceptor kamu

export default function Login({ onLoginSuccess, switchToRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/login", formData);
      const { token, user } = response.data;

      // Simpan Sesi di LocalStorage
      localStorage.setItem("sakuku_token", token);
      localStorage.setItem("sakuku_user", JSON.stringify(user));

      // Panggil callback ke App.jsx
      onLoginSuccess(user);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Gagal masuk. Periksa kembali email dan password Anda.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl transition-colors duration-200">
      {/* Header Logo & Title */}
      <div className="text-center mb-8">
        <div className="inline-flex w-12 h-12 rounded-2xl bg-emerald-600 items-center justify-center font-bold text-white text-2xl shadow-md shadow-emerald-200 dark:shadow-none mb-3">
          💰
        </div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
          Masuk ke SakuKu
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Kelola arus keuangan pribadimu dengan rapi
        </p>
      </div>

      {/* Banner Notifikasi Error */}
      {error && (
        <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-2xl text-xs font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Form Login */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="nama@email.com"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl transition-all shadow-md shadow-emerald-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Memproses...</span>
            </>
          ) : (
            "Masuk Sekarang"
          )}
        </button>
      </form>

      {/* Switcher ke Register */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Belum punya akun SakuKu?{" "}
          <button
            onClick={switchToRegister}
            className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            Daftar Akun Baru
          </button>
        </p>
      </div>
    </div>
  );
}
