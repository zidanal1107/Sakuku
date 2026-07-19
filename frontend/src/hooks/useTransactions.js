import { useState } from 'react';
import api from '../utils/api';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fungsi Ambil Data dari Backend
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await api.get('/expenses');
      // Cek apakah response.data berupa array, jika tidak coba ambil response.data.data
      const cleanData = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setTransactions(cleanData); 
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengambil data transaksi');
    } finally {
      setLoading(false);
    }
  };

  // 2. Fungsi Tambah Transaksi Baru ke Backend
  const addTransaction = async (transactionData) => {
    try {
      const response = await api.post('/expenses', transactionData);
      
      // 🛡️ SOLUSI AMAN: 
      // Jika backend membungkus di dalam .data.data, ambil itu.
      // Jika backend langsung mengembalikan objeknya di .data, ambil itu.
      const newTx = response.data?.data || response.data;
      
      // Pastikan data baru valid dan bukan undefined sebelum dimasukkan ke state
      if (newTx && typeof newTx === 'object') {
        setTransactions((prev) => [newTx, ...prev]);
        return { success: true };
      } else {
        console.error("Format respon backend tidak dikenali:", response.data);
        return { success: false, message: "Format data dari server tidak sesuai" };
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Gagal menyimpan transaksi' 
      };
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      // Perbarui state lokal dengan membuang item yang dihapus
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Gagal menghapus transaksi' };
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