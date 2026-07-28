import { useState, useCallback } from "react";
import api from "../utils/api"; // Pastikan path mengarah ke instance Axios Interceptor kamu

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fungsi Ambil Data dari Backend
  // Menggunakan useCallback agar fungsi ini aman saat dipanggil di useEffect App.jsx
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/expenses");

      // Ambil array transaksi, tangani pembungkus .data atau langsung array
      const cleanData = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      setTransactions(cleanData);
      setError(null);
    } catch (err) {
      // Backend kita mengirim { error: "pesan" }
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Gagal mengambil data transaksi";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Fungsi Tambah Transaksi Baru
  const addTransaction = async (transactionData) => {
    try {
      const response = await api.post("/expenses", transactionData);

      const newTx = response.data?.data || response.data;

      if (newTx && typeof newTx === "object") {
        // Masukkan data baru di posisi paling atas
        setTransactions((prev) => [newTx, ...prev]);
        return { success: true };
      } else {
        console.error("Format respon backend tidak dikenali:", response.data);
        return {
          success: false,
          message: "Format data dari server tidak sesuai",
        };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Gagal menyimpan transaksi";
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  // 3. Fungsi Hapus Transaksi
  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      // Perbarui state lokal dengan membuang item berdasarkan ID
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Gagal menghapus transaksi";
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
  };
};
