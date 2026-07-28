import { useState } from "react";
import api from "../utils/api"; // Path ke instance Axios Interceptor

export default function Register({ onRegisterSuccess, switchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    setError(null);

    const normalizedEmail = formData.email.trim().toLowerCase();

    // 1. Validasi Domain Email @sakuku.com
    if (!normalizedEmail.endsWith("@sakuku.com")) {
      return setError(
        "Email harus menggunakan domain resmi @sakuku.com (contoh: nama@sakuku.com).",
      );
    }

    // 2. Validasi Cocokkan Password
    if (formData.password !== formData.confirmPassword) {
      return setError("Konfirmasi password tidak cocok dengan password.");
    }

    // 3. Validasi Minimal Panjang Password
    if (formData.password.length < 6) {
      return setError("Password minimal harus 6 karakter.");
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        name: formData.name,
        email: normalizedEmail,
        password: formData.password,
      });

      onRegisterSuccess();
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Gagal mendaftar. Silakan coba lagi.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl transition-colors duration-200">
      {/* Header Logo & Title */}
      <div className="text-center mb-6">
        <div className="inline-flex w-12 h-12 rounded-2xl bg-emerald-600 items-center justify-center font-bold text-white text-2xl shadow-md shadow-emerald-200 dark:shadow-none mb-3">
          💰
        </div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
          Buat Akun SakuKu
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Mulai catat pemasukan dan pengeluaranmu hari ini
        </p>
      </div>

      {/* Banner Alert Error */}
      {error && (
        <div className="mb-5 p-4 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-2xl text-xs font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Form Register */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="nama@email.com"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Minimal 6 karakter"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Konfirmasi Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Ketik ulang password"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl transition-all shadow-md shadow-emerald-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Memproses Daftar...</span>
            </>
          ) : (
            "Daftar Akun"
          )}
        </button>
      </form>

      {/* Switcher ke Login */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Sudah punya akun SakuKu?{" "}
          <button
            onClick={switchToLogin}
            className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            Masuk Di Sini
          </button>
        </p>
      </div>
    </div>
  );
}
